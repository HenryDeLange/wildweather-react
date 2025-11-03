import { type BarSeriesOption, type LineSeriesOption } from 'echarts/charts';
import type { WeatherDataDto } from '../../../../redux/api/wildweatherApi';
import type { CategoryFilterType, CategoryType, GroupedFieldType, WeatherFieldType } from '../weatherTypes';
import type { WeatherChartProps } from './WeatherChart';
import { useGenerateXAxis } from './xAxis';

export function useGenerateSeries(
    chartType: WeatherChartProps['type'],
    data: WeatherDataDto['weather'],
    grouping: WeatherChartProps['grouping'],
    category: CategoryFilterType,
    month: WeatherChartProps['month']
): (LineSeriesOption | BarSeriesOption)[] {
    const showBarChart = grouping === 'YEARLY' || (grouping === 'MONTHLY' && month);
    const xAxis = useGenerateXAxis(grouping, month);
    const xAxisLabels = xAxis.data as string[];
    const series: (LineSeriesOption | BarSeriesOption)[] = Object.keys(data).flatMap(station => {
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
                ] as (LineSeriesOption | BarSeriesOption)[];
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
                }) as (LineSeriesOption | BarSeriesOption);
            }
        });
    });
    return series;
}

function getDataValues(
    chartType: WeatherChartProps['type'],
    categories: string[],
    data: WeatherDataDto['weather'],
    station: string,
    year: string,
    grouping: WeatherChartProps['grouping'],
    category: CategoryType,
    month: WeatherChartProps['month']
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

function getDayGroup(year: number, indexDay: number, month: WeatherChartProps['month']) {
    const date = new Date(year, (month ?? 1) - 1, indexDay + 1);
    return date.toLocaleDateString('en-CA').substring(0, 10); // 'en-CA' gives YYYY-MM-DD
}
