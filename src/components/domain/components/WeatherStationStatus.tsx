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
                        text={isFetching ? <Text size='small' variant='subdued'>{t('chartLoading')}</Text> :
                            <Text size='small'>
                                {data?.reduce((hasLatestDate, stationStatus) =>
                                    stationStatus.lastProcessedOn > hasLatestDate.lastProcessedOn ? stationStatus : hasLatestDate)
                                    .lastProcessedOn ?? ''}
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
                                label={stationStatus.station}
                                text={
                                    <Text size='small'>
                                        {stationStatus.lastProcessedOn}
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