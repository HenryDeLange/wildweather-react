import { useState, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWeatherQuery, useGetWeatherStationsQuery, type GetWeatherApiArg } from '../../../redux/api/wildweatherApi';
import { HBox, VBox } from '../../ui/layout';
import { Heading, Select, Separator, Spinner } from '../../ui/mywild';
import { ErrorDisplay } from '../base/ErrorDisplay';
import { WeatherChart } from './WeatherChart';

export function WeatherDisplay() {
    const { t } = useTranslation();

    const [chart, setCart] = useState<'TEMPERATURE' | 'RAIN' | 'WIND' | 'MISSING'>('RAIN');
    const [station, setStation] = useState<GetWeatherApiArg['station']>();
    const [grouping, setGrouping] = useState<GetWeatherApiArg['grouping']>('MONTHLY');
    const [aggregate, setAggregate] = useState<GetWeatherApiArg['aggregate']>('AVERAGE');
    const [category, setCategory] = useState<GetWeatherApiArg['category']>('A');

    const {
        data: weatherData,
        isLoading: weatherIsLoading,
        error: weatherError
    } = useGetWeatherQuery({ category, aggregate, grouping, station });

    const {
        data: stationsData,
        isLoading: stationsIsLoading,
        error: stationsError
    } = useGetWeatherStationsQuery();

    const isLoading = weatherIsLoading || stationsIsLoading;
    const chartGrouping = grouping?.toLowerCase() as ComponentProps<typeof WeatherChart>['grouping'] ?? 'daily';
    const chartType = chart.toLocaleLowerCase() as ComponentProps<typeof WeatherChart>['type'];

    return (
        <VBox>
            <HBox>
                <Heading size='small'>
                    {t('Past Weather')}
                </Heading>
                <Separator orientation='vertical' />
                <Select
                    items={['TEMPERATURE', 'RAIN', 'WIND', 'MISSING'].map(value => ({ label: t(`filterChart${value}`), value }))}
                    value={chart}
                    onValueChange={value => setCart(!value ? 'MISSING' : value as 'TEMPERATURE' | 'RAIN' | 'WIND' | 'MISSING')}
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
                    onValueChange={value => setCategory(!value ? undefined : value as GetWeatherApiArg['category'])}
                    placeholder={t('filterCategoryA')}
                />
            </HBox>
            <ErrorDisplay error={weatherError || stationsError} />
            {isLoading &&
                <Spinner />
            }
            {weatherData &&
                <>
                    <WeatherChart
                        type={chartType}
                        data={weatherData.weather}
                        loading={isLoading}
                        grouping={chartGrouping}
                    />
                </>
            }
        </VBox>
    );
}