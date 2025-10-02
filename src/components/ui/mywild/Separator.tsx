import { BaseUI_Separator } from '../implementations/base-ui/separator/BaseUI_Separator';

type Props = {
    orientation?: 'horizontal' | 'vertical';
    marginTop?: string;
    marginBottom?: string;
}

export function Separator({ orientation = 'horizontal', marginTop, marginBottom }: Props) {
    return (
        <BaseUI_Separator
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            orientation={orientation as any}
            marginTop={marginTop}
            marginBottom={marginBottom}
        />
    );
}