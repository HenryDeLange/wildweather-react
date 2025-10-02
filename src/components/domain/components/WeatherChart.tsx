import type { EChartsOption } from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

// Use individual manual imports to reduce bundle size. See https://github.com/hustcc/echarts-for-react?tab=readme-ov-file#usage

// Register the required components
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

// Register the theme
echarts.registerTheme('my_theme', {
    backgroundColor: '#e7e7e7ff'
});

type Props = {
    loading?: boolean;
}

export function WeatherChart({ loading }: Props) {
    const option: EChartsOption = {
        title: { text: 'Weather' },
        xAxis: { type: 'category', data: ['A', 'B', 'C'] },
        yAxis: { type: 'value' },
        series: [
            { name: 'rr', type: 'bar', data: [5, 20, 36] },
            { name: 'ff', type: 'bar', data: [15, 30, 18] }
        ],
        tooltip: {
            trigger: 'item',
            triggerOn: 'click'
        },
        legend: {
            show: true,
            orient: 'horizontal',
            data: ['rr', 'ff']
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
            style={{ height: '20rem', width: '30rem' }}
            // className='echarts-for-echarts'
            theme='my_theme'
            showLoading={loading}
            loadingOption={loadingOption}
        // onChartReady={onChartReadyCallback}
        // onEvents={EventsDict}
        // opts={ }
        />
    );
}