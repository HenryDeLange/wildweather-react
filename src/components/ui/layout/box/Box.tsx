import type { CSSProperties, ReactNode } from 'react';
import styles from './Box.module.css';

type Props = {
    children: ReactNode;
    debug?: boolean;
    marginLeft?: CSSProperties['marginLeft'];
    marginRight?: CSSProperties['marginRight'];
    gap?: CSSProperties['gap'];
}

export function Box({ children, debug, marginLeft, marginRight, gap }: Props) {
    return (
        <div
            className={styles.Box}
            style={{
                ...(debug ? { outline: '1px solid yellow' } : {}),
                ...(marginLeft ? { marginLeft } : {}),
                ...(marginRight ? { marginRight } : {}),
                ...(gap ? { gap } : {})
            }}
        >
            {children}
        </div>
    );
}