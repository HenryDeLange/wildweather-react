import { type FieldValues, type UseControllerProps } from 'react-hook-form';
import { BaseUI_FormField } from '../implementations/base-ui/form-field/BaseUI_FormField';

type Props<T extends FieldValues> = {
    label?: string;
    description?: string;
    placeholder?: string;
    formControl: UseControllerProps<T>;
    disabled?: boolean;
    type?: 'text' | 'password' | 'date';
    items?: never;
}

export function FormField<T extends FieldValues>({ label, description, placeholder, formControl, type = 'text', disabled }: Props<T>) {
    return (
        <BaseUI_FormField
            label={label}
            description={description}
            placeholder={placeholder}
            formControl={formControl}
            type={type}
            disabled={disabled}
        />
    );
}