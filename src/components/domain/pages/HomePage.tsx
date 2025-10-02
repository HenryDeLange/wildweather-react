import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PwaContext } from '../../../pwa/pwaContext';
import { useGetServerVersionQuery } from '../../../redux/api/wildweatherApi';
import { Box, PageContainer, VBox } from '../../ui/layout';
import { Button, Card, LinkButton, Text } from '../../ui/mywild';
import { ToastContext } from '../../ui/toast';
import { WeatherDisplay } from '../components/WeatherDisplay';

export function HomePage() {
    const { t } = useTranslation();

    const { isPwa, showPwaInstallButton, handleInstallClick } = useContext(PwaContext);

    // TODO: Move this show popup state into the context instead
    const [showPwa, setShowPwa] = useState(!isPwa && showPwaInstallButton);
    useEffect(() => setShowPwa(!isPwa && showPwaInstallButton), [isPwa, showPwaInstallButton]);

    const { showToast, updateToast, close } = useContext(ToastContext);

    const {
        data,
        isFetching,
        isError
    } = useGetServerVersionQuery();

    // TODO: Clean this up a bit before final release
    const toastIdRef = useRef<string | null>(null); // Using useRef instead of useState to prevent double toasts in dev mode
    useEffect(() => {
        const toastId = toastIdRef.current;
        if (toastId === null && isFetching) {
            const id = showToast({
                title: 'Status ⌛',
                description: 'Connecting to server...',
                type: 'loading',
                timeout: 60000
            });
            toastIdRef.current = id;
        }
        else if (toastId !== null && data) {
            updateToast(toastId, {
                title: 'Status ✅',
                description: 'Online and ready',
                type: 'success'
            });
            setTimeout(() => close(toastId), 2000);
            toastIdRef.current = null;
        }
        else if (toastId !== null && isError) {
            updateToast(toastId, {
                title: 'Status ⛔',
                description: 'Unable to connect to server! Please try again later.',
                type: 'error'
            });
            setTimeout(() => close(toastId), 30000);
            toastIdRef.current = null;
        }
    }, [close, data, isError, isFetching, showToast, toastIdRef, updateToast]);

    return (
        <PageContainer>
            <VBox fullWidth>
                <WeatherDisplay />
                {showPwa &&
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 12,
                            left: 12,
                            maxWidth: '15rem'
                        }}
                    >
                        <Card>
                            <VBox>
                                <Box>
                                    <Text size='small'>
                                        {t('pwaInstallDetails')}
                                    </Text>
                                    <Box marginLeft='1rem'>
                                        <div style={{ justifyItems: 'flex-start' }}>
                                            <LinkButton onClick={() => setShowPwa(false)}>
                                                X
                                            </LinkButton>
                                        </div>
                                    </Box>
                                </Box>
                                <Button onClick={handleInstallClick}>
                                    {t('pwaInstall')}
                                </Button>
                            </VBox>
                        </Card>
                    </div>
                }
            </VBox>
        </PageContainer>
    );
}
