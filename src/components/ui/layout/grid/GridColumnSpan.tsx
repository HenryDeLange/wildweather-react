import type { ReactNode } from 'react';
import styles from './GridColumnSpan.module.scss';

type Props = {
    children: ReactNode | ReactNode[];
    span: 1 | 2 | 3 | 4;
}

export function GridColumnSpan({ children, span }: Props) {
    return (
        <div
            className={styles.Span}
            data-grid-span={span}
        >
            {children}
        </div>
    );
}