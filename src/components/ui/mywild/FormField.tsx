import { type FieldValues, type UseControllerProps } from 'react-hook-form';
import { BaseUI_FormField } from '../implementations/base-ui/form-field/BaseUI_FormField';
import type { SelectItem } from './Select';

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

export function FormField<T extends FieldValues>({ label, description, placeholder, autoFocus, formControl, type = 'text', disabled, items, multiple, forceNotEmpty }: Props<T>) {
    if (type === 'list') {
        return (
            <BaseUI_FormField
                label={label}
                description={description}
                placeholder={placeholder}
                autoFocus={autoFocus}
                formControl={formControl}
                type={type}
                disabled={disabled}
                items={items!}
                forceNotEmpty={forceNotEmpty}
                multiple={multiple}
            />
        );
    }
    return (
        <BaseUI_FormField
            label={label}
            description={description}
            placeholder={placeholder}
            autoFocus={autoFocus}
            formControl={formControl}
            type={type}
            disabled={disabled}
        />
    );
}