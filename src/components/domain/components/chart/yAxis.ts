import type { EChartsOption } from 'echarts';
import type { WeatherChartProps } from './WeatherChart';

export function useGenerateYAxis(
    chartType: WeatherChartProps['type']
): EChartsOption['yAxis'] {
    if (chartType === 'WIND_DIRECTION') {
        return [
            {
                type: 'value',
                position: 'left',
                min: 0,
                max: 360,
                splitNumber: 12,
                axisLabel: {
                    fontSize: 16,
                    formatter: '{value}°'
                }
            },
            {
                type: 'value',
                position: 'right',
                min: 0,
                max: 360,
                splitNumber: 12,
                axisLabel: {
                    formatter: (value) => degreesToDirection(value)
                }
            }
        ];
    }
    else {
        return {
            type: 'value',
            axisLabel: {
                fontSize: 16
            }
        };
    }
}

const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
];

function degreesToDirection(deg: number): string {
    const index = Math.round(deg / (360 / 16)) % 16;
    return directions[index];
}
