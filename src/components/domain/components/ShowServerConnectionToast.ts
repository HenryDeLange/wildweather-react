import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetServerVersionQuery } from '../../../redux/api/wildweatherApi';
import { ToastContext } from '../../ui/toast';

export function ShowServerConnectionToast() {
    const { t } = useTranslation();

    const { showToast, updateToast, close } = useContext(ToastContext);

    const {
        data,
        isFetching,
        isError
    } = useGetServerVersionQuery();

    // Using useRef instead of useState to prevent double toasts in dev mode
    const toastIdRef = useRef<string | null>(null);

    useEffect(() => {
        const toastId = toastIdRef.current;
        if (toastId === null && isFetching) {
            const id = showToast({
                title: t('serverToastTitle', { icon: '⌛' }),
                description: t('serverToastConnecting'),
                type: 'loading',
                timeout: 120000
            });
            toastIdRef.current = id;
        }
        else if (toastId !== null && data) {
            updateToast(toastId, {
                title: t('serverToastTitle', { icon: '✅' }),
                description: t('serverToastOnline'),
                type: 'success'
            });
            setTimeout(() => close(toastId), 2000);
            toastIdRef.current = null;
        }
        else if (toastId !== null && isError) {
            updateToast(toastId, {
                title: t('serverToastTitle', { icon: '⛔' }),
                description: t('serverToastOffline'),
                type: 'error'
            });
            setTimeout(() => close(toastId), 30000);
            toastIdRef.current = null;
        }
    }, [close, data, isError, isFetching, showToast, toastIdRef, updateToast]);
    
    return null;
}
