import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import { useCallback, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useGetWeatherStationsQuery, type WeatherDataDto } from '../../../../redux/api/wildweatherApi';
import { ErrorDisplay } from '../../base/ErrorDisplay';
import type { CategoryFilterType, GroupingType, WeatherFieldType } from '../weatherTypes';
import { useEChartsLoadingOption } from './echartsLoadingOptions';
import { useEChartsOption } from './echartsOptions';
import { themeDark } from './themeDark';
import { themeLight } from './themeLight';

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
// https://echarts.apache.org/en/theme-builder.html
echarts.registerTheme('wildweather-dark', themeDark);
echarts.registerTheme('wildweather-light', themeLight);

export type WeatherChartProps = {
    type: WeatherFieldType;
    loading?: boolean;
    data: WeatherDataDto['weather'];
    grouping?: GroupingType;
    category: CategoryFilterType;
    month?: number | null;
    year?: number | null;
}

export function WeatherChart({ type, loading, data, grouping, category, month, year }: WeatherChartProps) {
    const {
        data: stationsData,
        isFetching: stationsIsLoading,
        error: stationsError
    } = useGetWeatherStationsQuery();

    const [highlightedSeriesIndex, setHighlightedSeriesIndex] = useState<number | undefined>();

    const tooltipRenderer = useCallback((params: CallbackDataParams | CallbackDataParams[]) => {
        const active = Array.isArray(params) ? params.find(p => p.seriesIndex === highlightedSeriesIndex) : params;
        if (!active) {
            return '';
        }
        return `<b>${active.seriesName}</b><br />${active.name}<br />${active.value}`;
    }, [highlightedSeriesIndex]);

    const option = useEChartsOption(type, data, grouping, category, month, year, stationsData, tooltipRenderer);
    const loadingOption = useEChartsLoadingOption();

    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const onEvents = useMemo(() => ({
        mouseover: (params: echarts.ECElementEvent) => {
            if (params.seriesIndex !== undefined) {
                setHighlightedSeriesIndex(params.seriesIndex);
            }
        },
        mouseout: () => {
            setHighlightedSeriesIndex(undefined);
        }
    }), []);

    return (
        <>
            <ErrorDisplay error={stationsError} />
            <ReactEChartsCore
                echarts={echarts}
                option={option}
                notMerge={true}
                lazyUpdate={true}
                showLoading={loading || stationsIsLoading}
                loadingOption={loadingOption}
                theme={isDarkMode ? 'wildweather-dark' : 'wildweather-light'}
                style={{ flex: 1, height: '100%' }}
                onEvents={onEvents}
            />
        </>
    );
}
