import { useTranslation } from 'react-i18next';
import { useGetWeatherQuery } from '../../../redux/api/wildweatherApi';
import { HCBox, PageContainer } from '../../ui/layout';
import { Heading, Spinner } from '../../ui/mywild';
import { ErrorDisplay } from '../base/ErrorDisplay';
import { WeatherChart } from './WeatherChart';

export function WeatherDisplay() {
    const { t } = useTranslation();
    const {
        data,
        isLoading,
        error
    } = useGetWeatherQuery({
        // startDate: ,
        // endDate: 
    });
    return (
        <PageContainer>
            <HCBox>
                <Heading>
                    {t('Past Weather')}
                </Heading>
                <ErrorDisplay error={error} />
                {isLoading &&
                    <Spinner />
                }
                {data &&
                    <WeatherChart
                        loading={isLoading}
                    />
                }
            </HCBox>
        </PageContainer>
    );
}