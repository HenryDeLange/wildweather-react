import type { ReactNode } from 'react';
import { Html_LabeledText } from '../implementations/html/labeled-text/Html_LabeledText';

type Props = {
    label: string | number;
    text: ReactNode;
    truncateText?: boolean;
}

export function LabeledText({ label, text, truncateText }: Props) {
    return (
        <Html_LabeledText
            label={label}
            text={text}
            truncateText={truncateText}
        />
    );
}