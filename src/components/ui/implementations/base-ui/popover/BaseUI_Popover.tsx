import { Popover } from '@base-ui-components/react/popover';
import type { ReactNode } from 'react';
import { ArrowSvg } from './BaseUI_ArrowSvg';
import styles from './BaseUI_Popover.module.css';

// https://base-ui.com/react/components/popover

type Props = {
    trigger: ReactNode;
    title?: ReactNode;
    description: ReactNode;
}

export function BaseUI_Popover({ trigger, title, description }: Props) {
    return (
        <Popover.Root>
            <Popover.Trigger className={styles.IconButton}>
                {trigger}
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner sideOffset={8}>
                    <Popover.Popup className={styles.Popup}>
                        <Popover.Arrow className={styles.Arrow}>
                            <ArrowSvg />
                        </Popover.Arrow>
                        <Popover.Title className={styles.Title}>
                            {title}
                        </Popover.Title>
                        <Popover.Description className={styles.Description}
                            render={
                                <div>{description}</div>
                            }
                        />
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}
