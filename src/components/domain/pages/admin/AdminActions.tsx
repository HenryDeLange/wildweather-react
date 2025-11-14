import { CloudDownload, FileSearchCorner, RefreshCcw, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAmbientWeatherApiProcessStatusQuery, useGetCsvProcessStatusQuery, useGetWeatherUndergroundApiProcessStatusQuery, useTriggerAmbientWeatherApiProcessingMutation, useTriggerCsvProcessingMutation, useTriggerWeatherUndergroundApiProcessingMutation } from '../../../../redux/api/wildweatherApi';
import { Box, HBox, PageContainer, VBox } from '../../../ui/layout';
import { Button, Heading, LinkButton, RouterButton, Separator, Switch } from '../../../ui/mywild';
import { ErrorDisplay } from '../../base/ErrorDisplay';

export function AdminActions() {
    const { t } = useTranslation();

    const [allCsvReload, setAllCsvReload] = useState(false);
    const [wuAllData, setWuAllData] = useState(false);

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
                <HBox>
                    <Button
                        icon={<FileSearchCorner />}
                        onClick={() => doCsvProcessing({ forceFullReload: allCsvReload })}
                        loading={csvProcessIsLoading || csvStatusIsLoading || csvStatus?.busy}
                    >
                        {t('adminCsvProcessingButton')}
                    </Button>
                    <Switch
                        checked={allCsvReload}
                        onCheckedChange={setAllCsvReload}
                    >
                        {allCsvReload ? t('adminCsvAllLoad') : t('adminCsvNewLoad')}
                    </Switch>
                </HBox>
                <Box>
                    <Button
                        icon={<CloudDownload />}
                        onClick={() => doAwApiProcessing()}
                        loading={awApiProcessIsLoading || awApiStatusIsLoading || awApiStatus?.busy}
                    >
                        {t('adminAmbientWeatherApiProcessingButton')}
                    </Button>
                </Box>
                <HBox>
                    <Button
                        icon={<CloudDownload />}
                        onClick={() => doWuApiProcessing({ fetchAllData: wuAllData })}
                        loading={wuApiProcessIsLoading || wuApiStatusIsLoading || wuApiStatus?.busy}
                    >
                        {t('adminWeatherUndergroundApiProcessingButton')}
                    </Button>
                    <Switch
                        checked={wuAllData}
                        onCheckedChange={setWuAllData}
                    >
                        {wuAllData ? t('adminWeatherUndergroundAllFetch') : t('adminWeatherUndergroundNewFetch')}
                    </Switch>
                </HBox>
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