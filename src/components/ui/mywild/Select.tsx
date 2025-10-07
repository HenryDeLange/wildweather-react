import { BaseUI_Select } from '../implementations/base-ui/select/BaseUI_Select';

export type SelectItem<T> = {
    label: string;
    value: T | null;
}

type Props<T> = {
    items: SelectItem<T>[];
    value: T | null;
    onValueChange: (value: T | null, eventDetails: unknown) => void;
    placeholder?: string;
}

export function Select<T>({ items, value, onValueChange, placeholder }: Props<T>) {
    return (
        <BaseUI_Select
            items={items}
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
        />
    );
}