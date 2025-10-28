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
    UniversalTransition,
    // MarkAreaComponent,
    // MarkPointComponent
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
    // | MarkAreaComponentOption
// | MarkPointComponentOption
>;

type Props = {
    type: WeatherFieldType;
    loading?: boolean;
    data: WeatherDataDto['weather'];
    grouping?: GetWeatherApiArg['grouping'];
    category: CategoryType;
    showMissing?: boolean;
}

export function WeatherChart({ type, loading, data, grouping, category, showMissing }: Props) {
    const { t } = useTranslation();

    const seriesData = generateSeriesData(type, grouping, data);

    const option: EChartsOption = {
        title: {
            text: t(`chartType${type}`)
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'cross'
            },
            // formatter: (params) => {
            //     if (!params?.data?.coord) {
            //         return `
            //             <u><b>${params.seriesName}</b></u><br/>
            //             <b>${params.name}</b><br/>
            //             <b>${params.data}°C</b>
            //             `;
            //     }
            //     else {
            //         const avg = seriesData[params.seriesIndex].data[params.dataIndex];
            //         const high = params.data.coord[0][1];
            //         const low = params.data.coord[1][1];
            //         return `
            //             <u><b>${params.seriesName}</b></u><br/>
            //             <b>${params.data.xAxis}</b><br/>
            //             ${low}°C | <b>${avg}°C</b> | ${high}°C
            //             `;
            //     }
            // }
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
        series: seriesData,
        legend: {
            show: true,
            type: 'scroll',
            bottom: 0
        },
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

export function generateCategories(grouping: Props['grouping']): string[] {
    switch (grouping) {
        case 'DAILY': {
            const days: string[] = [];
            const start = new Date(2024/*leap year*/, 0, 1);
            for (let i = 0; i < 366/*leap year*/; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                // TODO: use current lang from i18n
                const formatted = date.toLocaleDateString("en-GB", {
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
                // TODO: use current lang from i18n
                const formatted = month.toLocaleDateString("en-GB", {
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

function generateSeriesData(chartType: Props['type'], grouping: Props['grouping'], data: WeatherDataDto['weather']): (LineSeriesOption | BarSeriesOption)[] {
    const categories = generateCategories(grouping);
    const seriesList: (LineSeriesOption | BarSeriesOption)[] = Object.keys(data).flatMap(station => {
        return Object.keys(data[station]).flatMap(year => {
            const dataAverageRecords = getDataValues(chartType, categories, data, station, year, grouping, 'A');
            return ({
                name: `${station} ${year}`,
                symbolSize: 12,
                type: 'line',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    width: 4
                },
                barCategoryGap: "30%",
                triggerLineEvent: true,
                data: dataAverageRecords,
                // markArea: {
                //     data: getMarkArea(chartType, categories, data, station, year, grouping),
                //     // itemStyle: {
                //     //     color: 'rgba(135, 206, 250, 0.43)',
                //     //     borderWidth: 20,
                //     //     opacity: 0.75
                //     // },
                // },
            }) as LineSeriesOption | BarSeriesOption;
        });
    });
    return seriesList;
}

function getDataValues(chartType: Props['type'], categories: string[], data: WeatherDataDto['weather'], station: string, year: string, grouping: Props['grouping'], category: CategoryType) {
    return categories.map((categoryLabel, index) => {
        const group = grouping === 'YEARLY' ? categoryLabel
            : grouping === 'DAILY' ? new Date(`${categoryLabel} ${year}`).toISOString().substring(0, 10)
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
            return 0;
        }
    });
}

function getWeatherFieldTypeValue(type: WeatherFieldType, category: CategoryType, data: GroupedFieldType) {
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

// function getMarkArea(chartType: Props['type'], categories: string[], data: WeatherDataDto['weather'], station: string, year: string, grouping: Props['grouping']) {
//     const high = getDataValues(chartType, categories, data, station, year, grouping, 'H');
//     const low = getDataValues(chartType, categories, data, station, year, grouping, 'L');
//     const highLowPairs: (MarkArea1DDataItemOption | MarkArea2DDataItemOption)[] = high.map((h, i) => {
//         return [
//             {
//                 xAxis: categories[i],
//                 yAxis: h ?? -Infinity,
//                 itemStyle: {
//                     borderWidth: 15,
//                     opacity: 0.25
//                 }
//             },
//             {
//                 xAxis: categories[i],
//                 yAxis: low[i] ?? -Infinity,
//                 itemStyle: {
//                     borderWidth: 30,
//                     opacity: 0.75
//                 }
//             }
//         ];
//     });
//     return highLowPairs;
// }
