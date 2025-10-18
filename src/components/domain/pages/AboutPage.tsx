import { useTranslation } from 'react-i18next';
import { useGetServerVersionQuery } from '../../../redux/api/wildweatherApi';
import { HBox, HCBox, PageContainer, VBox } from '../../ui/layout';
import { Card, LabeledText, Separator, Spinner, Text } from '../../ui/mywild';
import myWildLogo from './../../../assets/mywild/mywild-logo.png';

export function AppAbout() {
    const { t } = useTranslation();

    const {
        data: serverData,
        isFetching: serverIsFetching,
        isError: serverIsError
    } = useGetServerVersionQuery();

    return (
        <PageContainer>
            <div style={{ width: '100%' }}>
                <VBox>
                    <HCBox>
                        <VBox gap='1.5rem'>
                            <Card
                                title={t('appTitle')}
                                description={t('aboutDescription')}
                            >
                                <Separator marginTop='1rem' />
                                <HBox gap='0.5rem' marginLeft='auto' marginRight='auto'>
                                    <img
                                        src={myWildLogo}
                                        height={20}
                                        alt='MyWild'
                                        style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '1px' }}
                                    />
                                    <a
                                        href='https://www.mywild.co.za'
                                        style={{ textDecoration: 'none' }}
                                        target='_blank'
                                        rel='noopener'
                                    >
                                        <Text size='small'>
                                            {t('mywildTitle')}
                                        </Text>
                                    </a>
                                </HBox>
                            </Card>
                            <Separator />
                            <HCBox>
                                <Card
                                    title={t('aboutVersion')}
                                >
                                    <VBox marginTop='1rem'>
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
                                </Card>
                            </HCBox>
                        </VBox>
                    </HCBox>
                </VBox>
            </div>
        </PageContainer>
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
