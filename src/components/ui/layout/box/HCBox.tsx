import type { CSSProperties, ReactNode } from 'react';
import styles from './HCBox.module.css';

type Props = {
    children: ReactNode;
    gap?: CSSProperties['gap'];
    marginVertical?: CSSProperties['margin'];
    marginHorizontal?: CSSProperties['margin'];
    maxWidth?: CSSProperties['maxWidth'];
}

export function HCBox({ children, gap = '1rem', marginVertical, marginHorizontal,maxWidth }: Props) {
    return (
        <div
            className={styles.HorizontalCenterBox}
            style={{
                ...(gap ? { gap } : {}),
                ...(marginVertical ? { marginTop: marginVertical, marginBottom: marginVertical } : {}),
                ...(marginHorizontal ? { marginLeft: marginHorizontal, marginRight: marginHorizontal } : {}),
                ...(maxWidth ? { maxWidth } : {})
            }}
        >
            {children}
        </div>
    );
}