import type { ReactNode } from 'react';
import { Html_LabeledText } from '../implementations/html/labeled-text/Html_LabeledText';

type Props = {
    label: ReactNode;
    body: ReactNode;
    truncateText?: boolean;
}

export function LabeledText({ label, body, truncateText }: Props) {
    return (
        <Html_LabeledText
            label={label}
            body={body}
            truncateText={truncateText}
        />
    );
}