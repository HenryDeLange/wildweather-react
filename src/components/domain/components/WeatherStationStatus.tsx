import { t } from 'i18next';
import { useGetWeatherStatusQuery } from '../../../redux/api/wildweatherApi';
import { Box, VBox } from '../../ui/layout';
import { LabeledText, Popover, Text } from '../../ui/mywild';
import { ErrorDisplay } from '../base/ErrorDisplay';

export function WeatherStationStatus() {
    const {
        data,
        isFetching,
        error
    } = useGetWeatherStatusQuery();

    return (
        <Box marginLeft='auto'>
            <Popover
                trigger={
                    <LabeledText
                        label={t('lastUpdated')}
                        body={isFetching ? <Text size='small' variant='subdued'>{t('chartLoading')}</Text> :
                            <Text size='small'>
                                {data?.reduce((hasLatestDate, stationStatus) =>
                                    stationStatus.endDate > hasLatestDate.endDate ? stationStatus : hasLatestDate)
                                    .endDate ?? ''}
                            </Text>
                        }
                    />
                }
                description={
                    <VBox>
                        <ErrorDisplay error={error} />
                        {data?.map(stationStatus => (
                            <LabeledText
                                key={stationStatus.station}
                                label={
                                    <Text size='small' variant={stationStatus.myStation ? 'bold' : undefined}>
                                        {stationStatus.station}
                                    </Text>
                                }
                                body={
                                    <Text size='small' variant={stationStatus.myStation ? 'bold' : undefined}>
                                        {`${stationStatus.startDate} to ${stationStatus.endDate}`}
                                    </Text>
                                }
                            />
                        ))}
                    </VBox>
                }
            />
        </Box>
    );
}