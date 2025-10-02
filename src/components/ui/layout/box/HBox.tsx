import type { CSSProperties, ReactNode } from 'react';
import styles from './HBox.module.css';

type Props = {
    children: ReactNode;
    debug?: boolean;
    gap?: CSSProperties['gap'];
    fullWidth?: boolean;
};

export function HBox({ children, debug, gap = '1rem', fullWidth }: Props) {
    return (
        <div
            className={styles.HorizontalBox}
            style={{
                ...(debug ? { outline: '1px solid blue' } : {}),
                ...(gap ? { gap } : {}),
                ...(fullWidth ? { width: '100%' } : {})
            }}
        >
            {children}
        </div>
    );
}