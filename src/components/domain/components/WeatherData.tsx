import type { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { useWatch } from 'react-hook-form';
import { useGetWeatherQuery } from '../../../redux/api/wildweatherApi';
import { Box } from '../../ui/layout';
import { ErrorDisplay } from '../base/ErrorDisplay';
import type { WeatherChart, WeatherChartProps } from './chart/WeatherChart';
import type { AggregateType, CategoryFilterType, GroupingType, WeatherFieldType, WeatherFilterType } from './weatherTypes';

type Props = {
    children: (state: WeatherChartProps) => ReactElement<typeof WeatherChart>;
}

export function WeatherData({ children }: Props) {
    const station = useWatch<WeatherFilterType>({ name: 'station' });
    const grouping = useWatch<WeatherFilterType>({ name: 'grouping' }) as GroupingType;
    const type = useWatch<WeatherFilterType>({ name: 'type' }) as WeatherFieldType;
    const category = useWatch<WeatherFilterType>({ name: 'category' }) as CategoryFilterType;
    const aggregate = useWatch<WeatherFilterType>({ name: 'aggregate' }) as AggregateType;
    const year = useWatch<WeatherFilterType>({ name: 'year' });
    const month = useWatch<WeatherFilterType>({ name: 'month' });

    const {
        data: weatherData,
        isFetching: weatherIsLoading,
        error: weatherError
    } = useGetWeatherQuery({
        station: station ?? undefined,
        grouping: grouping,
        weatherFields: [type],
        category: category === 'ALL' ? undefined : category,
        aggregate: aggregate,
        startDate: year ? new Date(Number(year), 0, 1).toLocaleDateString('en-CA') : undefined, // 'en-CA' gives YYYY-MM-DD
        endDate: year ? new Date(Number(year), 11, 31).toLocaleDateString('en-CA') : undefined, // 'en-CA' gives YYYY-MM-DD
        startMonth: month ? Number(month) : undefined,
        endMonth: month ? Number(month) : undefined
    });

    const chartNode = document.getElementById(WEATHER_CHART_DOM_ID);
    if (!chartNode) {
        console.warn(`Unable to render WeatherChart from WeatherData: Could not get element with id "${WEATHER_CHART_DOM_ID}".`)
        return null;
    }

    return createPortal(
        weatherError ? <Box margin='1rem'><ErrorDisplay error={weatherError} /></Box>
            : children({
                type: type,
                loading: weatherIsLoading,
                data: weatherData?.weather ?? {},
                grouping: grouping,
                category: category,
                month: month ? Number(month) : undefined
            }), chartNode);
}

export const WEATHER_CHART_DOM_ID = 'weather-chart-root';
