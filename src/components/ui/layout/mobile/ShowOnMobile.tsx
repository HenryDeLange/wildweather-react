import type { ReactNode } from 'react';
import styles from './ShowOnMobile.module.scss';

type Props = {
    children: ReactNode | ReactNode[];
    useHardCutoff?: boolean;
}

export function ShowOnMobile({ children, useHardCutoff }: Props) {
    return (
        <div className={useHardCutoff ? styles.ShowOnMobileHardCutoff : styles.ShowOnMobile}>
            {children}
        </div>
    );
}