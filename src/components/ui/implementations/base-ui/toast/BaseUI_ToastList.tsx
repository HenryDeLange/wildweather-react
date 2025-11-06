import { Toast } from '@base-ui-components/react/toast';
import { X } from 'lucide-react';
import styles from './BaseUI_Toast.module.css';

export function BaseUI_ToastList() {
    const { toasts } = Toast.useToastManager();
    return toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast} className={styles.Toast}>
            <Toast.Title className={styles.Title} />
            <Toast.Description className={styles.Description} />
            <Toast.Close className={styles.Close} aria-label='Close'>
                <X className={styles.Icon} />
            </Toast.Close>
        </Toast.Root>
    ));
}