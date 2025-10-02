import type { Orientation } from '@base-ui-components/react';
import { Separator } from '@base-ui-components/react/separator';
import styles from './BaseUI_Separator.module.css';

// https://base-ui.com/react/components/separator

type Props = {
    orientation: Orientation;
    marginTop?: string;
    marginBottom?: string;
}

export function BaseUI_Separator({ orientation, marginTop, marginBottom }: Props) {
    return (
        <div
            className={orientation === 'horizontal'
                ? undefined
                : styles.SeparatorContainer}
            style={{
                marginTop, marginBottom
            }}
        >
            <Separator
                orientation={orientation}
                className={orientation === 'horizontal'
                    ? styles.SeparatorHorizontal
                    : styles.SeparatorVertical}
            />
        </div>
    );
}