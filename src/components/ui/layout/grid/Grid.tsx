import type { ReactNode } from 'react';
import styles from './Grid.module.scss';

type Props = {
    children: ReactNode | ReactNode[];
}

export function Grid({ children }: Props) {
    return (
        <div className={styles.Grid}>
            {children}
        </div>
    );
}