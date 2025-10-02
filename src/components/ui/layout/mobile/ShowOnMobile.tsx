import type { ReactNode } from 'react';
import styles from './ShowOnMobile.module.scss';

type Props = {
    children: ReactNode | ReactNode[];
}

export function ShowOnMobile({ children }: Props) {
    return (
        <div className={styles.ShowOnMobile}>
            {children}
        </div>
    );
}