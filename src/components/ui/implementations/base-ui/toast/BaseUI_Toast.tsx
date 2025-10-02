import { Toast } from '@base-ui-components/react/toast';
import type { ReactNode } from 'react';
import styles from './BaseUI_Toast.module.css';

// https://base-ui.com/react/components/toast

type Props = {
    children: ReactNode | ReactNode[];
}

export function BaseUI_Toast({ children }: Props) {
    return (
        <Toast.Provider>
            {children}
            <Toast.Portal>
                <Toast.Viewport className={styles.Viewport}>
                    <ToastList />
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    );
}

function ToastList() {
    const { toasts } = Toast.useToastManager();
    return toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast} className={styles.Toast}>
            <Toast.Title className={styles.Title} />
            <Toast.Description className={styles.Description} />
            <Toast.Close className={styles.Close} aria-label='Close'>
                <XIcon className={styles.Icon} />
            </Toast.Close>
        </Toast.Root>
    ));
}

function XIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            {...props}
        >
            <path d='M18 6 6 18' />
            <path d='m6 6 12 12' />
        </svg>
    );
}