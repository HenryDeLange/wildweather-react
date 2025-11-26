import { type BarSeriesOption, type LineSeriesOption } from 'echarts/charts';
import { type GridComponentOption, type LegendComponentOption, type TitleComponentOption, type TooltipComponentOption } from 'echarts/components';
import type { TooltipFormatterCallback, TopLevelFormatterParams } from 'echarts/types/dist/shared';
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
    month: WeatherChartProps['month'],
    year: WeatherChartProps['year'],
    stations?: string[],
    tooltipRenderer?: string | TooltipFormatterCallback<TopLevelFormatterParams>
): EChartsOption {
    const { t } = useTranslation();

    const xAxisLabels = useGenerateXAxis(grouping, month, year);
    const yAxisLabels = useGenerateYAxis(chartType);
    const seriesValues = useGenerateSeries(chartType, data, grouping, category, month, year, stations);

    const chartUnit = chartType === 'TEMPERATURE' ? 'CELSIUS'
        : (chartType === 'WIND_SPEED' || chartType === 'WIND_MAX') ? 'KMpH'
            : chartType === 'WIND_DIRECTION' ? 'DEGREES'
                : chartType === 'RAIN_DAILY' ? 'MM'
                    : (chartType === 'HUMIDITY' || chartType === 'MISSING') ? 'PERCENTAGE'
                        : 'NONE';

    return {
        title: {
            text: t(`chartType${chartType}`),
            subtext: t(`chartUnit${chartUnit}`),
            top: 4
        },
        tooltip: {
            // trigger: 'item',
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                snap: true
            },
            formatter: tooltipRenderer,
            renderMode: 'html'
        },
        legend: {
            show: true,
            type: 'scroll',
            bottom: 4
        },
        grid: {
            left: 8,
            right: 8,
            top: 52,
            bottom: 36,
            containLabel: true
        },
        series: seriesValues,
        yAxis: yAxisLabels,
        xAxis: xAxisLabels as EChartsOption['xAxis']
    };
}
