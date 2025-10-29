import type { BaseUIChangeEventDetails } from '@base-ui-components/react';
import { Checkbox } from '@base-ui-components/react/checkbox';
import { Field } from '@base-ui-components/react/field';
import { CheckIcon } from 'lucide-react';
import type { Noop } from 'react-hook-form';
import styles from './BaseUI_Checkbox.module.css';

// https://base-ui.com/react/components/checkbox

type Props = {
    children?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean, eventDetails: BaseUIChangeEventDetails<'none'>) => void;
    placeholder?: string;
    autoFocus?: boolean;
    onBlur?: Noop;
}

export function BaseUI_Checkbox({ children, checked, onCheckedChange, onBlur, placeholder, autoFocus }: Props) {
    return (
        <Field.Root>
            <Field.Label className={styles.Label} data-placeholder={!!placeholder && (!children || children === '')}>
                <Checkbox.Root
                    className={styles.Checkbox}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    onBlur={onBlur}
                >
                    <Checkbox.Indicator className={styles.Indicator} autoFocus={autoFocus}>
                        <CheckIcon className={styles.Icon} />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                {(children || children === '') ? children : placeholder}
            </Field.Label>
        </Field.Root>
    );
}
