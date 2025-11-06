import { Toast } from '@base-ui-components/react/toast';
import type { ReactNode } from 'react';
import styles from './BaseUI_Toast.module.css';
import { BaseUI_ToastList } from './BaseUI_ToastList';

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
                    <BaseUI_ToastList />
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    );
}
