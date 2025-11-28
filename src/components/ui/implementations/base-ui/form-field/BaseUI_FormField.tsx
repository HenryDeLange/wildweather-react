import { Field } from '@base-ui-components/react/field';
import { Input } from '@base-ui-components/react/input';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { BaseUI_MultiSelect } from '../multi-select/BaseUI_MultiSelect';
import { BaseUI_Select, type SelectItem } from '../select/BaseUI_Select';
import styles from './BaseUI_FormField.module.css';

// https://base-ui.com/react/components/field

type BaseProps<T extends FieldValues> = {
    label?: string;
    description?: string;
    placeholder?: string;
    autoFocus?: boolean;
    formControl: UseControllerProps<T>;
    disabled?: boolean;
}

type NonListProps<T extends FieldValues> = BaseProps<T> & {
    type?: 'text' | 'password';
    items?: never;
    multiple?: never;
    forceNotEmpty?: never;
}

type ListProps<T extends FieldValues> = BaseProps<T> & {
    type: 'list';
    items: SelectItem[];
    multiple?: boolean;
    forceNotEmpty?: boolean;
}

type Props<T extends FieldValues> = NonListProps<T> | ListProps<T>

export function BaseUI_FormField<T extends FieldValues>({ label, description, placeholder, autoFocus, formControl, type, disabled, items, multiple, forceNotEmpty }: Props<T>) {
    const { field, fieldState: { error, invalid } } = useController(formControl);
    return (
        <Field.Root className={styles.Field} disabled={disabled} invalid={invalid}>
            {label &&
                <Field.Label className={styles.Label}>
                    {label}
                </Field.Label>
            }
            <Field.Control
                className={styles.Input}
                render={
                    disabled ?
                        <Input
                            type={type}
                            placeholder={placeholder}
                            autoFocus={autoFocus}
                            {...field}
                        />
                        : type === 'list' ?
                            multiple
                                ?
                                <BaseUI_MultiSelect
                                    items={items ?? []}
                                    values={field.value}
                                    onValueChange={forceNotEmpty ? (value) => field.onChange(!value ? field.value : value) : field.onChange}
                                    onBlur={field.onBlur}
                                    placeholder={placeholder}
                                    autoFocus={autoFocus}
                                />
                                :
                                <BaseUI_Select
                                    items={items ?? []}
                                    value={field.value}
                                    onValueChange={forceNotEmpty ? (value) => field.onChange(!value ? field.value : value) : field.onChange}
                                    onBlur={field.onBlur}
                                    placeholder={placeholder}
                                    autoFocus={autoFocus}
                                />
                            :
                            <Input
                                type={type}
                                placeholder={placeholder}
                                autoFocus={autoFocus}
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