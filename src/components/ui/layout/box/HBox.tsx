import type { CSSProperties, ReactNode } from 'react';
import styles from './HBox.module.css';

type Props = {
    children: ReactNode;
    debug?: boolean;
    gap?: CSSProperties['gap'];
    fullWidth?: boolean;
    marginLeft?: CSSProperties['marginLeft'];
    marginRight?: CSSProperties['marginRight'];
};

export function HBox({ children, debug, gap = '1rem', fullWidth, marginLeft, marginRight }: Props) {
    return (
        <div
            className={styles.HorizontalBox}
            style={{
                ...(debug ? { outline: '1px solid blue' } : {}),
                ...(gap ? { gap } : {}),
                ...(fullWidth ? { width: '100%' } : {}),
                ...(marginLeft ? { marginLeft } : {}),
                ...(marginRight ? { marginRight } : {})
            }}
        >
            {children}
        </div>
    );
}