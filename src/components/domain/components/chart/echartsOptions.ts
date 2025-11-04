import { type BarSeriesOption, type LineSeriesOption } from 'echarts/charts';
import { type GridComponentOption, type LegendComponentOption, type TitleComponentOption, type TooltipComponentOption } from 'echarts/components';
import { useTranslation } from 'react-i18next';
import type { WeatherDataDto } from '../../../../redux/api/wildweatherApi';
import type { CategoryFilterType } from '../weatherTypes';
import { useGenerateSeries } from './series';
import type { WeatherChartProps } from './WeatherChart';
import { useGenerateXAxis } from './xAxis';
import { useGenerateYAxis } from './yAxis';

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | (LineSeriesOption | BarSeriesOption)
    | LegendComponentOption
>

export function useEChartsOption(
    chartType: WeatherChartProps['type'],
    data: WeatherDataDto['weather'],
    grouping: WeatherChartProps['grouping'],
    category: CategoryFilterType,
    month: WeatherChartProps['month']
): EChartsOption {
    const { t } = useTranslation();

    const xAxisLabels = useGenerateXAxis(grouping, month);
    const yAxisLabels = useGenerateYAxis(chartType);
    const seriesValues = useGenerateSeries(chartType, data, grouping, category, month);

    return {
        title: {
            text: t(`chartType${chartType}`)
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
        series: seriesValues,
        yAxis: yAxisLabels,
        xAxis: xAxisLabels as EChartsOption['xAxis'],
        legend: {
            show: true,
            type: 'scroll',
            bottom: 0
        }
    };
}
