import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useMediaQuery } from 'usehooks-ts';
import type { WeatherDataDto } from '../../../../redux/api/wildweatherApi';
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
    const option = useEChartsOption(type, data, grouping, category, month);
    const loadingOption = useEChartsLoadingOption();
    const dark = useMediaQuery('(prefers-color-scheme: dark)');
    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            showLoading={loading}
            loadingOption={loadingOption}
            theme={dark ? 'wildweather-dark' : 'wildweather-light'}
            style={{ flex: 1, height: '100%' }}
        />
    );
}
