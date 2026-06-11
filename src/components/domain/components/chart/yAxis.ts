import type { EChartsOption } from 'echarts';
import type { AggregateType } from '../weatherTypes';
import type { WeatherChartProps } from './WeatherChart';

export function useGenerateYAxis(chartType: WeatherChartProps['type'], aggregate: AggregateType): EChartsOption['yAxis'] {
    switch (chartType) {
        case 'WIND_DIRECTION':
            return [
                {
                    type: 'value',
                    position: 'left',
                    min: 0,
                    max: 360,
                    splitNumber: 12,
                    axisLabel: {
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
                        formatter: (value: number) => degreesToDirection(value)
                    }
                }
            ];
        case 'TEMPERATURE':
            return aggregate === 'AVERAGE'
                ? {
                    type: 'value',
                    min: 0,
                    max: 45
                }
                : {
                    type: 'value'
                };
        case 'RAIN_DAILY':
            return {
                type: 'value',
                min: 0,
                max: 220
            }
        case 'WIND_SPEED':
            return aggregate === 'AVERAGE'
                ? {
                    type: 'value',
                    min: 0,
                    max: 100
                }
                : {
                    type: 'value'
                };
        case 'WIND_MAX':
            return aggregate === 'AVERAGE'
                ? {
                    type: 'value',
                    min: 0,
                    max: 120
                }
                : {
                    type: 'value'
                };
        case 'MISSING':
        case 'HUMIDITY':
            return aggregate === 'AVERAGE'
                ? {
                    type: 'value',
                    min: 0,
                    max: 100
                }
                : {
                    type: 'value'
                };
        case 'UV_RADIATION_INDEX':
            return aggregate === 'AVERAGE'
                ? {
                    type: 'value',
                    min: 0,
                    max: 17
                }
                : {
                    type: 'value'
                };
        case 'PRESSURE':
            return aggregate === 'AVERAGE'
                ? {
                    type: 'value',
                    min: 970,
                    max: 1050
                }
                : {
                    type: 'value'
                };
        default:
            return {
                type: 'value'
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
