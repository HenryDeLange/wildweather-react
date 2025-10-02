import type { ReactNode } from 'react';
import styles from './PageContainer.module.css';

type Props = {
    children: ReactNode;
}

export function PageContainer({ children }: Props) {
    return (
        <div className={styles.PageContainer}>
            {children}
        </div>
    );
}