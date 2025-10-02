import type { CSSProperties } from 'react';
import { Html_Text } from '../implementations/html/text/Html_Text';

type Props = {
    children: string | number;
    variant?: 'standard' | 'bold' | 'priority' | 'error' | 'warning' | 'subdued';
    size?: 'standard' | 'priority' | 'large' | 'small' | 'tiny';
    textAlign?: CSSProperties['textAlign'];
    truncateText?: boolean;
}

export function Text({ children, variant, size, textAlign, truncateText }: Props) {
    return (
        <Html_Text
            variant={variant}
            size={size}
            textAlign={textAlign}
            truncateText={truncateText}
        >
            {children}
        </Html_Text>
    );
}