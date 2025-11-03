import type { CSSProperties, ReactNode } from 'react';
import styles from './Grid.module.scss';

type Props = {
    children: ReactNode | ReactNode[];
    margin?: CSSProperties['margin'];
    debug?: boolean;
}

export function Grid({ children, margin, debug }: Props) {
    return (
        <div
            className={styles.Grid}
            style={{
                ...(debug ? { outline: '1px solid green', backgroundColor: '#3d3c133f' } : {}),
                ...(margin ? { margin } : {})
            }}
        >
            {children}
        </div >
    );
}