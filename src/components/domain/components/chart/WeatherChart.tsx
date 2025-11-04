import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { WeatherDataDto } from '../../../../redux/api/wildweatherApi';
import type { CategoryFilterType, GroupingType, WeatherFieldType } from '../weatherTypes';
import { useEChartsLoadingOption } from './echartsLoadingOptions';
import { useEChartsOption } from './echartsOptions';

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
echarts.registerTheme('wildweather_theme', {
    backgroundColor: '#e7e7e7ff'
});

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
    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            showLoading={loading}
            loadingOption={loadingOption}
            theme='wildweather_theme'
            style={{ flex: 1, height: '100%' }}
        />
    );
}
