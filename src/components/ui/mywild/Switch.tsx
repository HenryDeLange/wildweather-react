import { BaseUI_Switch } from '../implementations/base-ui/switch/BaseUI_Switch';

type Props = {
    children: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export function Switch({ children, checked, onCheckedChange }: Props) {
    return (
        <BaseUI_Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
        >
            {children}
        </BaseUI_Switch>
    );
}