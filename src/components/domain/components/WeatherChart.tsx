import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart, type BarSeriesOption, LineChart, type LineSeriesOption } from 'echarts/charts';
import { GridComponent, type GridComponentOption, LegendComponent, type LegendComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useTranslation } from 'react-i18next';
import type { GetWeatherApiArg, WeatherDataDto } from '../../../redux/api/wildweatherApi';
import type { CategoryType, GroupedFieldType, WeatherFieldType } from './types';

// Use individual manual imports to reduce bundle size. See https://github.com/hustcc/echarts-for-react?tab=readme-ov-file#usage

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
    | LineSeriesOption
    | BarSeriesOption
    | LegendComponentOption
>;

type Props = {
    type: WeatherFieldType;
    data: WeatherDataDto['weather'];
    loading?: boolean;
    grouping?: GetWeatherApiArg['grouping'];
    category: CategoryType;
}

export function WeatherChart({ type, data, loading, grouping, category }: Props) {
    const { t } = useTranslation();

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
        yAxis: {
            type: 'value',
            axisLabel: {
                margin: 30,
                fontSize: 16
            }
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: true,
                interval: 30
            },
            axisLabel: {
                margin: 12,
                fontSize: 14
            },
            boundaryGap: true,
            axisTick: {
                interval: 7
            },
            data: generateCategories(grouping)
        },
        series: generateSeriesData(type, grouping, category, data),
        legend: {
            show: true,
            type: 'scroll',
            bottom: 0
        }
    };

    const loadingOption = {
        text: 'Loading',
        color: '#185180ff',
        textColor: '#23426bff',
        maskColor: '#868c8d9d',
        zlevel: 0,
        fontSize: 14,
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

const generateCategories = (grouping: Props['grouping']): string[] => {
    switch (grouping) {
        case 'DAILY': {
            const days: string[] = [];
            const start = new Date(2024/*leap year*/, 0, 1);
            for (let i = 0; i < 366/*leap year*/; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                const formatted = date.toLocaleDateString("en-GB", { // TODO: use current lang from i18n
                    day: "2-digit",
                    month: "short"
                });
                days.push(formatted);
            }
            return days;
        }
        case 'WEEKLY': {
            const weeks: string[] = [];
            for (let i = 1; i <= 53; i++) {
                weeks.push(String(i).padStart(2, '0'));
            }
            return weeks;
        }
        case 'MONTHLY': {
            const months: string[] = [];
            for (let i = 0; i < 12; i++) {
                const month = new Date(2025, i, 1);
                const formatted = month.toLocaleDateString("en-GB", { // TODO: use current lang from i18n
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
};

const generateSeriesData = (type: Props['type'], grouping: Props['grouping'], category: CategoryType, data: WeatherDataDto['weather']): (LineSeriesOption | BarSeriesOption)[] => {
    const seriesList: (LineSeriesOption | BarSeriesOption)[] = Object.keys(data).flatMap(station => {
        // TODO: Handle year grouping 
        console.log(grouping)
        return Object.keys(data[station]).flatMap(year => {
            const dataRecords = Object.keys(data[station][year]).flatMap(group => {
                return getValue(type, category, data[station][year][group] as GroupedFieldType)
            });
            return ({
                name: `${station} ${year}`,
                symbolSize: 12,
                type: 'bar',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    width: 4
                },
                barCategoryGap: "30%",
                triggerLineEvent: true,
                data: dataRecords
            }) as LineSeriesOption | BarSeriesOption;
        });
    });
    console.log({ seriesList })
    return seriesList;
};



function getValue(type: WeatherFieldType, category: CategoryType, data: GroupedFieldType) {
    switch (type) {
        case 'TEMPERATURE':
            return data['tmp'][category];
        case 'WIND_SPEED':
            return data['wSp'][category];
        case 'WIND_MAX':
            return data['wMx'][category];
        case 'WIND_DIRECTION':
            return data['wDr'][category];
        case 'RAIN_RATE':
            return data['rRt'][category];
        case 'RAIN_DAILY':
            return data['rDy'][category];
        case 'PRESSURE':
            return data['prs'][category];
        case 'HUMIDITY':
            return data['hmd'][category];
        case 'UV_RADIATION_INDEX':
            return data['uvI'][category];
        case 'MISSING':
            return data['mis'][category];
        default:
            return 0;
    }
}
