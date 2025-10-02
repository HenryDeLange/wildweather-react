import type { ReactNode } from 'react';
import styles from './HideOnMobile.module.scss';

type Props = {
    children: ReactNode | ReactNode[];
    useHardCutoff?: boolean;
}

export function HideOnMobile({ children, useHardCutoff }: Props) {
    return (
        <div className={useHardCutoff ? styles.HideOnMobileHardCutoff : styles.HideOnMobile}>
            {children}
        </div>
    );
}