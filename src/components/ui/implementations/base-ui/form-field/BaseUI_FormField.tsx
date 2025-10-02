import { Field } from '@base-ui-components/react/field';
import { Input } from '@base-ui-components/react/input';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import styles from './BaseUI_FormField.module.css';

// https://base-ui.com/react/components/field

type Props<T extends FieldValues> = {
    label?: string;
    description?: string;
    placeholder?: string;
    formControl: UseControllerProps<T>;
    disabled?: boolean;
    type?: 'text' | 'password' | 'date';
    items?: never;
}

export function BaseUI_FormField<T extends FieldValues>({ label, description, placeholder, formControl, type, disabled }: Props<T>) {
    const { field, fieldState: { error } } = useController(formControl);
    return (
        <Field.Root className={styles.Field} disabled={disabled}>
            {label &&
                <Field.Label className={styles.Label}>
                    {label}
                </Field.Label>
            }
            <Field.Control
                className={styles.Input}
                render={
                    <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                    />
                }
            />
            {description &&
                <Field.Description className={styles.Description}>
                    {description}
                </Field.Description>
            }
            {error?.message &&
                <Field.Error className={styles.Error} match={true}>
                    {error.message}
                </Field.Error>
            }
        </Field.Root>
    );
}