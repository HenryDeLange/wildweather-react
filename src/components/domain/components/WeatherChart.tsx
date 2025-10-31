import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart, type BarSeriesOption, LineChart, type LineSeriesOption } from 'echarts/charts';
import { GridComponent, type GridComponentOption, LegendComponent, type LegendComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useTranslation } from 'react-i18next';
import type { WeatherDataDto } from '../../../redux/api/wildweatherApi';
import type { CategoryFilterType, CategoryType, GroupedFieldType, GroupingType, WeatherFieldType } from './types';

// Use individual manual imports to reduce bundle size:
// https://github.com/hustcc/echarts-for-react?tab=readme-ov-file#usage

// Register the required components
echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    LineChart,
    BarChart,
    CanvasRenderer,
    UniversalTransition
]);

// Register the theme
echarts.registerTheme('my_theme', {
    backgroundColor: '#e7e7e7ff'
});

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | (LineSeriesOption | BarSeriesOption)
    | LegendComponentOption
>;

type Props = {
    type: WeatherFieldType;
    loading?: boolean;
    data: WeatherDataDto['weather'];
    grouping?: GroupingType;
    category: CategoryFilterType;
    month?: number | null;
}

export function WeatherChart({ type, loading, data, grouping, category, month }: Props) {
    const { t } = useTranslation();

    const xAxisLabels = useGenerateXAxis(grouping, month);
    const yAxisValues = useGenerateYAxis(type, grouping, month, data, category);

    const option: EChartsOption = {
        title: {
            text: t(`chartType${type}`)
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            left: 8,
            right: 8,
            bottom: 40,
            containLabel: true
        },
        series: yAxisValues,
        yAxis: type === 'WIND_DIRECTION' ?
            [
                {
                    type: 'value',
                    position: 'left',
                    min: 0,
                    max: 360,
                    splitNumber: 12,
                    axisLabel: {
                        fontSize: 16,
                        formatter: '{value}°'
                    }
                },
                {
                    type: 'value',
                    position: 'right',
                    min: 0,
                    max: 360,
                    splitNumber: 12,
                    axisLabel: {
                        formatter: (value) => degreesToDirection(value)
                    }
                }
            ]
            : {
                type: 'value',
                axisLabel: {
                    fontSize: 16
                }
            },
        xAxis: {
            type: 'category',
            splitLine: {
                show: true,
                interval: 30
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                fontSize: 16
            },
            boundaryGap: true,
            axisTick: {
                interval: 7
            },
            data: xAxisLabels
        },
        legend: {
            show: true,
            type: 'scroll',
            bottom: 0
        },
    };

    const loadingOption = {
        text: t('chartLoading'),
        color: '#185180ff',
        textColor: '#23426bff',
        maskColor: '#868c8d9d',
        zlevel: 0,
        fontSize: 16,
        showSpinner: true,
        spinnerRadius: 10,
        lineWidth: 5,
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontFamily: 'sans-serif'
    };

    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{ flex: 1, height: '100%' }}
            // className='echarts-for-echarts'
            theme='my_theme'
            showLoading={loading}
            loadingOption={loadingOption}
        // onChartReady={onChartReadyCallback}
        />
    );
}

export function useGenerateXAxis(
    grouping: Props['grouping'],
    month: Props['month']
): string[] {
    const { i18n } = useTranslation();
    switch (grouping) {
        case 'DAILY': {
            const days: string[] = [];
            const startDate = new Date(2024, (month ?? 1) - 1, 1); // 2024 is a leap year
            const formatter = new Intl.DateTimeFormat(i18n.language, {
                day: '2-digit',
                month: 'short'
            });
            const start = month ? startDate.getDate() : 1; // 2024 is a leap year
            const end = month ? new Date(2024, month, 0).getDate() : 366; // 366 for leap year
            for (let i = start; i <= end; i++) {
                const date = new Date(startDate);
                date.setDate(i);
                days.push(formatter.format(date));
            }
            return days;
        }
        case 'WEEKLY': {
            const weeks: string[] = [];
            const start = month ? Number(validWeekRangeForMonth(month)[0]) : 1;
            const end = month ? Number(validWeekRangeForMonth(month)[1]) : 53;
            for (let i = start; i <= end; i++) {
                weeks.push(String(i).padStart(2, '0'));
            }
            return weeks;
        }
        case 'MONTHLY': {
            const months: string[] = [];
            const start = month ? (month - 1) : 0;
            const end = month ? month : 12;
            const monthFormatter = new Intl.DateTimeFormat(i18n.language, {
                month: 'long'
            });
            for (let i = start; i < end; i++) {
                const month = new Date(2025, i, 1);
                months.push(monthFormatter.format(month));
            }
            return months;
        }
        case 'YEARLY': {
            const years: string[] = [];
            for (let i = 2023; i <= new Date().getFullYear(); i++) {
                years.push(String(i));
            }
            return years;
        }
        default:
            return [];
    }
}

function useGenerateYAxis(
    chartType: Props['type'],
    grouping: Props['grouping'],
    month: Props['month'],
    data: WeatherDataDto['weather'],
    category: CategoryFilterType
): LineSeriesOption[] {
    const showBarChart = grouping === 'YEARLY'
        || (grouping === 'MONTHLY' && month);
    const xAxisLabels = useGenerateXAxis(grouping, month);
    const yAxisValues: LineSeriesOption[] = Object.keys(data).flatMap(station => {
        return Object.keys(data[station]).flatMap(year => {
            const seriesName = `${station} ${year}`;
            if (category === 'ALL') {
                return [
                    {
                        name: seriesName,
                        type: showBarChart ? 'bar' : 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        symbolSize: 10,
                        lineStyle: {
                            width: 3,
                            type: 'dashed'
                        },
                        triggerLineEvent: true,
                        data: getDataValues(chartType, xAxisLabels, data, station, year, grouping, 'H', month)
                    },
                    {
                        name: seriesName,
                        type: showBarChart ? 'bar' : 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        symbolSize: 12,
                        lineStyle: {
                            width: 2,
                            type: 'dashed'
                        },
                        triggerLineEvent: true,
                        data: getDataValues(chartType, xAxisLabels, data, station, year, grouping, 'A', month)
                    },
                    {
                        name: seriesName,
                        type: showBarChart ? 'bar' : 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        symbolSize: 12,
                        lineStyle: {
                            width: 1,
                            type: 'dashed'
                        },
                        triggerLineEvent: true,
                        data: getDataValues(chartType, xAxisLabels, data, station, year, grouping, 'L', month)
                    }
                ] as LineSeriesOption[];
            }
            else {
                const categoryRecords = getDataValues(chartType, xAxisLabels, data, station, year, grouping, category, month);
                return ({
                    name: seriesName,
                    type: showBarChart ? 'bar' : 'line',
                    smooth: true,
                    emphasis: {
                        focus: 'series'
                    },
                    symbolSize: 12,
                    lineStyle: {
                        width: 4
                    },
                    areaStyle: {
                        opacity: 0.1
                    },
                    triggerLineEvent: true,
                    data: categoryRecords
                }) as LineSeriesOption;
            }
        });
    });
    return yAxisValues;
}

function getDataValues(
    chartType: Props['type'],
    categories: string[],
    data: WeatherDataDto['weather'],
    station: string,
    year: string,
    grouping: Props['grouping'],
    category: CategoryType,
    month: Props['month']
) {
    return categories.map((categoryLabel, index) => {
        const group = grouping === 'YEARLY' ? categoryLabel
            : (grouping === 'MONTHLY' && month) ? month < 9 ? `0${month}` : `${month}`
                : (grouping === 'WEEKLY' && month) ? categoryLabel
                    : grouping === 'DAILY' ? getDayGroup(Number(year), index, month)
                        : index < 9 ? `0${index + 1}` : `${index + 1}`;
        const dataRecord = data[station][year][group] as GroupedFieldType;
        if (dataRecord) {
            return getWeatherFieldTypeValue(chartType, category, dataRecord)
        }
        else {
            if (Number(year) <= 2023) {
                return null;
            }
            if (grouping === 'MONTHLY') {
                const today = new Date();
                if (Number(year) === today.getFullYear() && today.getMonth() < index) {
                    return null;
                }
            }
            if (grouping === 'WEEKLY' && month) {
                return null;
            }
            return null;
        }
    });
}

function getWeatherFieldTypeValue(
    type: WeatherFieldType,
    category: CategoryType,
    data: GroupedFieldType
) {
    if (!data) {
        return null;
    }
    switch (type) {
        case 'TEMPERATURE':
            return data['tmp']?.[category] ?? null;
        case 'WIND_SPEED':
            return data['wSp']?.[category] ?? null;
        case 'WIND_MAX':
            return data['wMx']?.[category] ?? null;
        case 'WIND_DIRECTION':
            return data['wDr']?.[category] ?? null;
        case 'RAIN_RATE':
            return data['rRt']?.[category] ?? null;
        case 'RAIN_DAILY':
            return data['rDy']?.[category] ?? null;
        case 'PRESSURE':
            return data['prs']?.[category] ?? null;
        case 'HUMIDITY':
            return data['hmd']?.[category] ?? null;
        case 'UV_RADIATION_INDEX':
            return data['uvI']?.[category] ?? null;
        case 'MISSING':
            return data['mis']?.[category] ?? null;
        default:
            return null;
    }
}

const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
];

function degreesToDirection(deg: number): string {
    const index = Math.round(deg / (360 / 16)) % 16;
    return directions[index];
}

const monthWeeks = [
    ['01', '06'],
    ['05', '09'],
    ['09', '14'],
    ['13', '18'],
    ['17', '22'],
    ['22', '27'],
    ['26', '31'],
    ['31', '36'],
    ['35', '40'],
    ['40', '44'],
    ['44', '49'],
    ['48', '53']
];

function validWeekRangeForMonth(month: number) {
    return monthWeeks[month - 1];
}

function getDayGroup(year: number, indexDay: number, month: Props['month']) {
    const date = new Date(year, (month ?? 1) - 1, indexDay + 1);
    return date.toLocaleDateString('en-CA').substring(0, 10); // 'en-CA' gives YYYY-MM-DD
}
