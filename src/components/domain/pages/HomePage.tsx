import { useContext, useEffect, useRef } from 'react';
import { useGetServerVersionQuery } from '../../../redux/api/wildweatherApi';
import { PageContainer } from '../../ui/layout';
import { ToastContext } from '../../ui/toast';
import { WeatherDisplay } from '../components/WeatherDisplay';

export function HomePage() {
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
            <WeatherDisplay />
        </PageContainer>
    );
}
