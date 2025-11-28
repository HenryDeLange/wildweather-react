import type { BaseUIChangeEventDetails } from '@base-ui-components/react';
import { Field } from '@base-ui-components/react/field';
import { Switch } from '@base-ui-components/react/switch';
import { Text } from '../../../mywild';
import styles from './BaseUI_Switch.module.css';

// https://base-ui.com/react/components/switch

type Props = {
    children?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean, eventDetails: BaseUIChangeEventDetails<'none'>) => void;
}

export function BaseUI_Switch({ children, checked, onCheckedChange }: Props) {
    return (
        <Field.Root>
            <Field.Label className={styles.Label}>
                <Switch.Root className={styles.Switch} checked={checked} onCheckedChange={onCheckedChange}>
                    <Switch.Thumb className={styles.Thumb} />
                </Switch.Root>
                {children &&
                    <Text size='small'>
                        {children}
                    </Text>
                }
            </Field.Label>
        </Field.Root>
    );
}