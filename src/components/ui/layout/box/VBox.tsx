import type { CSSProperties, ReactNode } from 'react';
import styles from './VBox.module.css';

type PropsBase = {
    children: ReactNode;
    debug?: boolean;
    gap?: CSSProperties['gap'];
    margin?: CSSProperties['margin'];
    marginTop?: CSSProperties['marginTop'];
    marginBottom?: CSSProperties['marginBottom'];
};

type FullWidthOnly = {
    fullWidth: boolean;
    maxWidth?: never;
};

type MaxWidthOnly = {
    fullWidth?: never;
    maxWidth: CSSProperties['maxWidth'];
};

type NeitherWidth = {
    fullWidth?: never;
    maxWidth?: never;
};

type Props = PropsBase & (FullWidthOnly | MaxWidthOnly | NeitherWidth);

export function VBox({ children, debug, gap = '1rem', margin, marginTop, marginBottom, ...props }: Props) {
    return (
        <div
            className={styles.VerticalBox}
            style={{
                ...(debug ? { outline: '1px solid red' } : {}),
                ...(gap ? { gap } : {}),
                ...(margin ? { margin } : {}),
                ...(marginTop ? { marginTop } : {}),
                ...(marginBottom ? { marginBottom } : {}),
                ...('fullWidth' in props && props.fullWidth ? { width: '100%' } : {}),
                ...('maxWidth' in props && props.maxWidth ? { maxWidth: props.maxWidth } : {})
            }}
        >
            {children}
        </div>
    );
}