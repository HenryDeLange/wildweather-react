import type { ComponentProps } from 'react';
import { BaseUI_Checkbox } from '../implementations/base-ui/checkbox/BaseUI_Checkbox';

type ImplementationType = ComponentProps<typeof BaseUI_Checkbox>;

type Props = {
    children: ImplementationType['children'];
    checked: ImplementationType['checked'];
    onCheckedChange: (checked: boolean, eventDetails: unknown) => void;
    placeholder?: ImplementationType['placeholder'];
    autoFocus?: boolean;
    onBlur?: ImplementationType['onBlur'];
}

export function Checkbox(props: Props) {
    return (
        <BaseUI_Checkbox {...props} />
    )
}