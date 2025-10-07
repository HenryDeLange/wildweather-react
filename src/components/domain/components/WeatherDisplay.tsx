import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWeatherQuery, type GetWeatherApiArg } from '../../../redux/api/wildweatherApi';
import { HBox, VBox } from '../../ui/layout';
import { Heading, Select, Separator, Spinner } from '../../ui/mywild';
import { ErrorDisplay } from '../base/ErrorDisplay';
import { WeatherChart } from './WeatherChart';

export function WeatherDisplay() {
    const { t } = useTranslation();
    const [aggregate, setAggregate] = useState<GetWeatherApiArg['aggregate']>('AVERAGE');
    const {
        data,
        isLoading,
        error
    } = useGetWeatherQuery({
        category: 'A',
        aggregate: !aggregate ? undefined : aggregate,
        grouping: 'MONTHLY'
    });
    return (
        <VBox>
            <HBox>
                <Heading size='small'>
                    {t('Past Weather')}
                </Heading>
                <Separator orientation='vertical' />
                <Select
                    items={[
                        { label: t('aggregateAVERAGE'), value: 'AVERAGE' },
                        { label: t('aggregateTOTAL'), value: 'TOTAL' }
                    ]}
                    value={aggregate}
                    onValueChange={(value) => setAggregate(!value ? undefined : value as GetWeatherApiArg['aggregate'])}
                    placeholder={t('aggregateAVERAGE')}
                />
            </HBox>
            <ErrorDisplay error={error} />
            {isLoading &&
                <Spinner />
            }
            {data &&
                <>
                    <WeatherChart
                        type='temperature'
                        data={data.weather}
                        loading={isLoading}
                        grouping='monthly'
                    />
                    <Separator />
                    <WeatherChart
                        type='rain'
                        data={data.weather}
                        loading={isLoading}
                        grouping='monthly'
                    />
                    <Separator />
                    <WeatherChart
                        type='wind'
                        data={data.weather}
                        loading={isLoading}
                        grouping='monthly'
                    />
                    <Separator />
                    <WeatherChart
                        type='missing'
                        data={data.weather}
                        loading={isLoading}
                        grouping='monthly'
                    />
                </>

            }
        </VBox>
    );
}