import type { CSSProperties, ReactNode } from 'react';
import styles from './Box.module.css';

type Props = {
    children: ReactNode;
    marginLeft?: CSSProperties['marginLeft'];
    marginRight?: CSSProperties['marginRight'];
}

export function Box({ children, marginLeft, marginRight }: Props) {
    return (
        <div
            className={styles.Box}
            style={{
                ...(marginLeft ? { marginLeft } : {}),
                ...(marginRight ? { marginRight } : {})
            }}
        >
            {children}
        </div>
    );
}