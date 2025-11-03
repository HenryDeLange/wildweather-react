import type { CSSProperties, ReactNode } from 'react';
import styles from './FixedGrid.module.scss';

type Props = {
    children: ReactNode | ReactNode[];
    columnCount?: 1 | 2 | 3 | 4 | 5;
    firstColumnIsPrimary?: boolean;
    fitCellWidth?: boolean;
    singleColumnOnMobile?: boolean;
    margin?: CSSProperties['margin'];
    debug?: boolean;
}

export function FixedGrid({ children, columnCount = 2, firstColumnIsPrimary, fitCellWidth, singleColumnOnMobile= true, margin, debug }: Props) {
    const gridTemplate = fitCellWidth ? 'auto' : '1fr'; // "1fr" = take up remaining space, "auto" =  size to content
    return (
        <div
            className={styles.FixedGrid}
            data-grid-count={columnCount}
            data-grid-full-width-cells={gridTemplate === '1fr'}
            data-mobile-mode={singleColumnOnMobile}
            style={{
                ...(debug ? { outline: '1px solid green', backgroundColor: '#133d133f' } : {}),
                ...(firstColumnIsPrimary && columnCount)
                    ? {
                        gridTemplateColumns: `1fr ${Array(columnCount - 1).fill(gridTemplate).join(" ")}`
                    }
                    : undefined,
                ...(margin ? { margin } : {})
            }}
        >
            {children}
        </div >
    );
}