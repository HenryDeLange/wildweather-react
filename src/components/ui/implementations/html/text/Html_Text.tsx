import type { CSSProperties } from 'react';
import styles from './Html_Text.module.css';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span

type Props = {
    children: string | number;
    variant?: 'standard' | 'bold' | 'priority' | 'error' | 'warning' | 'subdued';
    size?: 'standard' | 'priority' | 'large' | 'small' | 'tiny';
    textAlign?: CSSProperties['textAlign'];
    truncateText?: boolean;
}

export function Html_Text({ children, variant, size = 'standard', textAlign, truncateText }: Props) {
    return (
        <span
            className={styles.Text}
            data-variant={variant}
            data-size={size}
            data-truncate={truncateText}
            style={{ ...(textAlign ? { textAlign } : {}) }}
        >
            {children}
        </span>
    );
}