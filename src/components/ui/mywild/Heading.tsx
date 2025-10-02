import { Html_Heading } from '../implementations/html/heading/Html_Heading';

type Props = {
    children: string | number;
    textAlign?: React.CSSProperties['textAlign'];
    variant?: 'standard' | 'priority' | 'error' | 'warning';
    size?: 'standard' | 'title' | 'sub-title' | 'small';
}

export function Heading({ children, textAlign, variant, size }: Props) {
    return (
        <Html_Heading
            textAlign={textAlign}
            variant={variant}
            size={size}
        >
            {children}
        </Html_Heading>
    );
}