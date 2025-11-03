import { BaseUI_Select } from '../implementations/base-ui/select/BaseUI_Select';

export type SelectItem = {
    label: string;
    value: string | null;
}

type Props = {
    placeholder?: string;
    autoFocus?: boolean;
    items: SelectItem[];
    value?: string | null;
    onValueChange: (value?: string | null, eventDetails?: unknown) => void;
}

export function Select({ placeholder, autoFocus, items, value, onValueChange }: Props) {
    return (
        <BaseUI_Select
            placeholder={placeholder}
            autoFocus={autoFocus}
            items={items}
            value={value}
            onValueChange={onValueChange}
        />
    );
}