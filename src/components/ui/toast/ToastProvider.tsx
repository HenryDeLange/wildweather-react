import { Toast } from '@base-ui-components/react/toast';
import { type ReactNode } from 'react';
import { BaseUI_Toast } from '../implementations/base-ui/toast/BaseUI_Toast';
import { ToastContext } from './toastContext';

type Props = {
    children: ReactNode;
}

export function ToastProvider({ children }: Props) {
    return (
        <BaseUI_Toast>
            <ToastedChildren>
                {children}
            </ToastedChildren>
        </BaseUI_Toast>
    );
}

function ToastedChildren({ children }: Props) {
    const toastManager = Toast.useToastManager();
    return (
        <ToastContext.Provider
            value={{
                showToast: options => {
                    return toastManager.add({ ...options });
                },
                updateToast: (toastId, options) => {
                    toastManager.update(toastId, { ...options });
                    return toastId;
                },
                close: (toastId) => {
                    toastManager.close(toastId);
                },
                promiseToast: (promise, options) => {
                    toastManager.promise(promise, { ...options });
                }
            }}
        >
            {children}
        </ToastContext.Provider>
    );
}