import { BaseUI_Popover } from '../implementations/base-ui/popover/BaseUI_Popover';

type Props = {
    title: string;
    description: string;
}

export function Popover({ title, description }: Props) {
    return (
        <BaseUI_Popover
            title={title}
            description={description}
        />
    );
}