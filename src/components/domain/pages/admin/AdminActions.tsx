import { CloudDownload, FileSearchCorner, RefreshCcw, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGetAmbientWeatherApiProcessStatusQuery, useGetCsvProcessStatusQuery, useGetWeatherUndergroundApiProcessStatusQuery, useTriggerAmbientWeatherApiProcessingMutation, useTriggerCsvProcessingMutation, useTriggerWeatherUndergroundApiProcessingMutation } from '../../../../redux/api/wildweatherApi';
import { Box, HBox, PageContainer, VBox } from '../../../ui/layout';
import { Button, Heading, LinkButton, RouterButton, Separator } from '../../../ui/mywild';
import { ErrorDisplay } from '../../base/ErrorDisplay';

export function AdminActions() {
    const { t } = useTranslation();

    const {
        refetch: csvStatusRefetch,
        data: csvStatus,
        isFetching: csvStatusIsLoading,
        error: csvStatusError
    } = useGetCsvProcessStatusQuery();

    const [
        doCsvProcessing,
        {
            isLoading: csvProcessIsLoading,
            error: csvProcessError
        }
    ] = useTriggerCsvProcessingMutation();

    const {
        refetch: awApiStatusRefetch,
        data: awApiStatus,
        isFetching: awApiStatusIsLoading,
        error: awApiStatusError
    } = useGetAmbientWeatherApiProcessStatusQuery();

    const [
        doAwApiProcessing,
        {
            isLoading: awApiProcessIsLoading,
            error: awApiProcessError
        }
    ] = useTriggerAmbientWeatherApiProcessingMutation();

    const {
        refetch: wuApiStatusRefetch,
        data: wuApiStatus,
        isFetching: wuApiStatusIsLoading,
        error: wuApiStatusError
    } = useGetWeatherUndergroundApiProcessStatusQuery();

    const [
        doWuApiProcessing,
        {
            isLoading: wuApiProcessIsLoading,
            error: wuApiProcessError
        }
    ] = useTriggerWeatherUndergroundApiProcessingMutation();

    return (
        <PageContainer>
            <VBox fullWidth margin='0.5rem 0.75rem'>
                <HBox gap='2rem'>
                    <Heading>
                        {t('adminProcessingTitle')}
                    </Heading>
                    <LinkButton
                        onClick={() => {
                            csvStatusRefetch();
                            awApiStatusRefetch();
                            wuApiStatusRefetch();
                        }}
                    >
                        <RefreshCcw />
                    </LinkButton>
                </HBox>
                <ErrorDisplay error={
                    csvStatusError || csvProcessError ||
                    awApiStatusError || awApiProcessError ||
                    wuApiStatusError || wuApiProcessError
                } />
                <Box>
                    <Button
                        icon={<FileSearchCorner />}
                        onClick={() => doCsvProcessing({ forceFullReload: true })}
                        loading={csvProcessIsLoading || csvStatusIsLoading || csvStatus?.busy}
                    >
                        {t('adminCsvProcessingButton')}
                    </Button>
                </Box>
                <Box>
                    <Button
                        icon={<CloudDownload />}
                        onClick={() => doAwApiProcessing()}
                        loading={awApiProcessIsLoading || awApiStatusIsLoading || awApiStatus?.busy}
                    >
                        {t('adminAmbientWeatherApiProcessingButton')}
                    </Button>
                </Box>
                <Box>
                    <Button
                        icon={<CloudDownload />}
                        onClick={() => doWuApiProcessing({ fetchAllData: true })}
                        loading={wuApiProcessIsLoading || wuApiStatusIsLoading || wuApiStatus?.busy}
                    >
                        {t('adminWeatherUndergroundApiProcessingButton')}
                    </Button>
                </Box>
                <Separator />
                <Heading>
                    {t('adminUsersTitle')}
                </Heading>
                <Box>
                    <RouterButton
                        icon={<UserPlus />}
                        to='/user/register'
                    >
                        {t('registerButton')}
                    </RouterButton>
                </Box>
            </VBox>
        </PageContainer>
    );
}