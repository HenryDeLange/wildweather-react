import { BaseUI_Dialog } from '../implementations/base-ui/dialog/BaseUI_Dialog';

type Props = {
    title: string;
    description: string;
    buttonText: string;
}

export function Dialog({ title, description, buttonText }: Props) {
    return (
        <BaseUI_Dialog
            title={title}
            description={description}
            buttonText={buttonText}
        />
    );
}