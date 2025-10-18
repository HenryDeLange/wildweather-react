import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWeatherQuery, useGetWeatherStationsQuery, type GetWeatherApiArg } from '../../../redux/api/wildweatherApi';
import { HBox, VBox } from '../../ui/layout';
import { Select, Spinner } from '../../ui/mywild';
import { ErrorDisplay } from '../base/ErrorDisplay';
import { type CategoryType, type WeatherFieldType } from './types';
import { WeatherChart } from './WeatherChart';

export function WeatherDisplay() {
    const { t } = useTranslation();

    const [chart, setCart] = useState<WeatherFieldType>('RAIN_DAILY');
    const [station, setStation] = useState<GetWeatherApiArg['station']>();
    const [grouping, setGrouping] = useState<GetWeatherApiArg['grouping']>('MONTHLY');
    const [aggregate, setAggregate] = useState<GetWeatherApiArg['aggregate']>('AVERAGE');
    const [category, setCategory] = useState<CategoryType>('A');
    const [month, setMonth] = useState<GetWeatherApiArg['startMonth'] | null>(null);

    const {
        data: weatherData,
        isLoading: weatherIsLoading,
        error: weatherError
    } = useGetWeatherQuery({
        station,
        grouping,
        aggregate,
        category,
        startMonth: month === null ? undefined : month,
        endMonth: month === null ? undefined : month
    });

    const {
        data: stationsData,
        isLoading: stationsIsLoading,
        error: stationsError
    } = useGetWeatherStationsQuery();

    const isLoading = weatherIsLoading || stationsIsLoading;
    const chartGrouping = grouping ?? 'DAILY';
    const chartType = chart;

    return (
        <VBox>
            <HBox>
                <Select
                    items={[
                        'TEMPERATURE',
                        'WIND_SPEED',
                        'WIND_MAX',
                        'WIND_DIRECTION',
                        'RAIN_RATE',
                        'RAIN_DAILY',
                        'PRESSURE',
                        'HUMIDITY',
                        'UV_RADIATION_INDEX',
                        'MISSING'
                    ].map(value => ({ label: t(`filterChart${value}`), value }))}
                    value={chart}
                    onValueChange={value => setCart(!value ? 'MISSING' : value as WeatherFieldType)}
                />
                <Select
                    items={stationsData?.map(station => ({ label: station, value: station })) ?? []}
                    value={station}
                    onValueChange={value => setStation(!value ? undefined : value)}
                    placeholder={t('filterStationPlaceholder')}
                />
                <Select
                    items={['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'].map(value => ({ label: t(`filterGroup${value}`), value }))}
                    value={grouping}
                    onValueChange={value => setGrouping(!value ? undefined : value as GetWeatherApiArg['grouping'])}
                    placeholder={t('filterGroupDAILY')}
                />
                <Select
                    items={['AVERAGE', 'TOTAL'].map(value => ({ label: t(`filterAggregate${value}`), value }))}
                    value={aggregate}
                    onValueChange={value => setAggregate(!value ? undefined : value as GetWeatherApiArg['aggregate'])}
                    placeholder={t('filterAggregateAVERAGE')}
                />
                <Select
                    items={['A', 'L', 'H'].map(value => ({ label: t(`filterCategory${value}`), value }))}
                    value={category}
                    onValueChange={value => setCategory(!value ? 'A' : value as CategoryType)}
                    placeholder={t('filterCategoryA')}
                />
                <Select
                    items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => ({ label: t(`filterMonth${value}`), value }))}
                    value={month}
                    onValueChange={value => setMonth(!value ? null : value)}
                    placeholder={t('filterMonth')}
                />
            </HBox>
            <ErrorDisplay error={weatherError || stationsError} />
            {isLoading &&
                <Spinner />
            }
            {weatherData &&
                <WeatherChart
                    type={chartType}
                    data={weatherData.weather}
                    loading={isLoading}
                    grouping={chartGrouping}
                    category={category}
                />
            }
        </VBox>

    );
}