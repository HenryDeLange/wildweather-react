import type { ReactNode } from 'react';
import { BaseUI_Popover } from '../implementations/base-ui/popover/BaseUI_Popover';

type Props = {
    trigger: ReactNode;
    title?: ReactNode;
    description: ReactNode;
}

export function Popover({ trigger, title, description }: Props) {
    return (
        <BaseUI_Popover
            trigger={trigger}
            title={title}
            description={description}
        />
    );
}