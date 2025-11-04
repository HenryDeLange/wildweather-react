import { CloudDownload, FileSearchCorner, RefreshCcw, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGetApiProcessStatusQuery, useGetCsvProcessStatusQuery, useTriggerApiProcessingMutation, useTriggerCsvProcessingMutation } from '../../../../redux/api/wildweatherApi';
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
        refetch: apiStatusRefetch,
        data: apiStatus,
        isFetching: apiStatusIsLoading,
        error: apiStatusError
    } = useGetApiProcessStatusQuery();

    const [
        doApiProcessing,
        {
            isLoading: apiProcessIsLoading,
            error: apiProcessError
        }
    ] = useTriggerApiProcessingMutation();

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
                            apiStatusRefetch();
                        }}
                    >
                        <RefreshCcw />
                    </LinkButton>
                </HBox>
                <ErrorDisplay error={csvStatusError || csvProcessError || apiStatusError || apiProcessError} />
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
                        onClick={() => doApiProcessing()}
                        loading={apiProcessIsLoading || apiStatusIsLoading || apiStatus?.busy}
                    >
                        {t('adminApiProcessingButton')}
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