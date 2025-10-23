import { createContext } from 'react';

type ToastOptions = {
    title: string;
    description: string;
    timeout?: number;
    priority?: 'low' | 'high';
    type?: keyof ToastPromiseStateOptions;
    data?: Record<string, unknown>;
}

type ToastPromiseStateOptions = {
    loading: string | ToastOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    success: string | ToastOptions | ((result: any) => string | ToastOptions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: string | ToastOptions | ((error: any) => string | ToastOptions);
}

export type ToastContextType = {
    showToast: (options: ToastOptions) => string;
    updateToast: (toastId: string, options: ToastOptions) => string;
    close: (toastId: string) => void;
    promiseToast: <T>(promise: Promise<T>, options: ToastPromiseStateOptions) => void;
    mutationFeedbackToast: <T>(promise: Promise<T>, title: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
    showToast: () => 'toastId',
    updateToast: () => 'toastId',
    close: () => { },
    promiseToast: () => { },
    mutationFeedbackToast: () => { }
});
