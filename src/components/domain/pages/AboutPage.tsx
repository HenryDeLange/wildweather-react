import { useTranslation } from 'react-i18next';
import { useGetServerVersionQuery } from '../../../redux/api/wildweatherApi';
import { Box, HBox, PageContainer, VBox } from '../../ui/layout';
import { Heading, LabeledText, Separator, Spinner, Text } from '../../ui/mywild';
import myWildLogo from './../../../assets/mywild/mywild-logo.png';

export function AboutPage() {
    const { t } = useTranslation();

    const {
        data: serverData,
        isFetching: serverIsFetching,
        isError: serverIsError
    } = useGetServerVersionQuery();

    return (
        <PageContainer>
            <VBox fullWidth>
                <Box margin='1rem'>
                    <VBox fullWidth gap='1.5rem'>
                        <VBox>
                            <Heading>
                                {t('appTitle')}
                            </Heading>
                            <Text>
                                {t('aboutDescription')}
                            </Text>
                        </VBox>
                        <Separator marginTop='1rem' />
                        <HBox gap='0.5rem' marginLeft='auto' marginRight='auto'>
                            <img
                                src={myWildLogo}
                                height={30}
                                alt='MyWild'
                                style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '1px' }}
                            />
                            <a
                                href='https://www.mywild.co.za'
                                style={{ textDecoration: 'none' }}
                                target='_blank'
                                rel='noopener'
                            >
                                <VBox gap={0}>
                                    <Text size='standard'>
                                        {t('mywildTitle')}
                                    </Text>
                                    <Text size='small' variant='subdued'>
                                        {t('mywildDeveloper')}
                                    </Text>
                                </VBox>
                            </a>
                        </HBox>
                        <Separator />
                        <VBox>
                            <Heading>
                                {t('aboutVersion')}
                            </Heading>
                            <LabeledText
                                label={t('aboutVersionWebsite')}
                                text={`${VITE_APP_VERSION} | ${dateFormatter.format(new Date(import.meta.env.VITE_COMMIT_DATE))} | ${import.meta.env.VITE_COMMIT_HASH}`}
                            />
                            <LabeledText
                                label={t('aboutVersionServer')}
                                text={
                                    (!serverIsFetching && serverData)
                                        ? `${serverData.appVersion} | ${dateFormatter.format(new Date(serverData.commitTime))} | ${serverData.commitId}`
                                        : !serverIsError
                                            ? <Spinner size='small' />
                                            : <Text variant='error'>{t('errorUnknown')}</Text>
                                }
                            />
                        </VBox>
                    </VBox>
                </Box>
            </VBox >
        </PageContainer >
    );
}

const dateFormatter = new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Africa/Johannesburg'
});
