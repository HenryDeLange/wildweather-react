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
            const start = new Date(2024/*leap year*/, 0, 1);
            for (let i = 0; i < 366/*leap year*/; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                const formatted = date.toLocaleDateString(i18n.language, {
                    day: "2-digit",
                    month: "short"
                });
                days.push(formatted);
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
            for (let i = start; i < end; i++) {
                const month = new Date(2025, i, 1);
                const formatted = month.toLocaleDateString(i18n.language, {
                    month: "long"
                });
                months.push(formatted);
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
            : grouping === 'DAILY' ? new Date(`${categoryLabel} ${year}`).toISOString().substring(0, 10)
                : (grouping === 'MONTHLY' && month) ? month < 9 ? `0${month}` : `${month}`
                    : (grouping === 'WEEKLY' && month) ? categoryLabel
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
            return 0;
        }
    });
}

function getWeatherFieldTypeValue(
    type: WeatherFieldType,
    category: CategoryType,
    data: GroupedFieldType
) {
    if (!data) {
        return 0;
    }
    switch (type) {
        case 'TEMPERATURE':
            return data['tmp']?.[category] ?? 0;
        case 'WIND_SPEED':
            return data['wSp']?.[category] ?? 0;
        case 'WIND_MAX':
            return data['wMx']?.[category] ?? 0;
        case 'WIND_DIRECTION':
            return data['wDr']?.[category] ?? 0;
        case 'RAIN_RATE':
            return data['rRt']?.[category] ?? 0;
        case 'RAIN_DAILY':
            return data['rDy']?.[category] ?? 0;
        case 'PRESSURE':
            return data['prs']?.[category] ?? 0;
        case 'HUMIDITY':
            return data['hmd']?.[category] ?? 0;
        case 'UV_RADIATION_INDEX':
            return data['uvI']?.[category] ?? 0;
        case 'MISSING':
            return data['mis']?.[category] ?? 0;
        default:
            return 0;
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
