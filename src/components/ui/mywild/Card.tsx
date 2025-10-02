import type { ReactNode } from 'react';
import { Html_Card } from '../implementations/html/card/Html_Card';

type Props = {
    title?: ReactNode;
    description?: ReactNode | ReactNode[];
    right?: ReactNode | ReactNode[];
    children?: ReactNode;
}

export function Card({ title, description, right, children }: Props) {
    return (
        <Html_Card
            title={title}
            description={description}
            right={right}
        >
            {children}
        </Html_Card>
    );
}