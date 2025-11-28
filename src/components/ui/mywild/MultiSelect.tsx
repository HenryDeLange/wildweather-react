import { BaseUI_MultiSelect } from '../implementations/base-ui/multi-select/BaseUI_MultiSelect';

export type SelectItem = {
    label: string;
    value: string;
}

type Props = {
    placeholder?: string;
    autoFocus?: boolean;
    items: SelectItem[];
    values?: string[] | null;
    onValueChange: (value?: string[] | null, eventDetails?: unknown) => void;
}

export function MultiSelect({ placeholder, autoFocus, items, values, onValueChange }: Props) {
    return (
        <BaseUI_MultiSelect
            placeholder={placeholder}
            autoFocus={autoFocus}
            items={items}
            values={values}
            onValueChange={onValueChange}
        />
    );
}