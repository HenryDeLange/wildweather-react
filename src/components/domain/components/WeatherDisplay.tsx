import { useTranslation } from 'react-i18next';
import { useGetWeatherQuery } from '../../../redux/api/wildweatherApi';
import { VBox } from '../../ui/layout';
import { Heading, Separator, Spinner } from '../../ui/mywild';
import { ErrorDisplay } from '../base/ErrorDisplay';
import { WeatherChart } from './WeatherChart';

export function WeatherDisplay() {
    const { t } = useTranslation();
    const {
        data,
        isLoading,
        error
    } = useGetWeatherQuery({
        // TODO: Add ability for UI to filter
    });
    return (
        <VBox>
            <Heading size='small'>
                {t('Past Weather')}
            </Heading>
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
                        grouping='month'
                    />
                    <Separator />
                    <WeatherChart
                        type='rain'
                        data={data.weather}
                        loading={isLoading}
                        grouping='month'
                    />
                    <Separator />
                    <WeatherChart
                        type='wind'
                        data={data.weather}
                        loading={isLoading}
                        grouping='month'
                    />
                </>

            }
        </VBox>
    );
}