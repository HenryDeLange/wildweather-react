import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
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
}

export function WeatherChart({ type, loading, data, grouping, category, month }: WeatherChartProps) {
    const {
        data: stationsData,
        isFetching: stationsIsLoading,
        error: stationsError
    } = useGetWeatherStationsQuery();

    const option = useEChartsOption(type, data, grouping, category, month, stationsData);
    const loadingOption = useEChartsLoadingOption();
    
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
            />
        </>
    );
}
