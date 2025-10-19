import type { CSSProperties, ReactNode } from 'react';
import styles from './Box.module.css';

type Props = {
    children: ReactNode;
    debug?: boolean;
    margin?: CSSProperties['margin'];
    marginLeft?: CSSProperties['marginLeft'];
    marginRight?: CSSProperties['marginRight'];
    marginTop?: CSSProperties['marginTop'];
    marginBottom?: CSSProperties['marginBottom'];
    gap?: CSSProperties['gap'];
}

export function Box({ children, debug, margin, marginLeft, marginRight, marginTop, marginBottom, gap }: Props) {
    return (
        <div
            className={styles.Box}
            style={{
                ...(debug ? { outline: '1px solid yellow' } : {}),
                ...(margin ? { margin } : {}),
                ...(marginLeft ? { marginLeft } : {}),
                ...(marginRight ? { marginRight } : {}),
                ...(marginTop ? { marginTop } : {}),
                ...(marginBottom ? { marginBottom } : {}),
                ...(gap ? { gap } : {})
            }}
        >
            {children}
        </div>
    );
}