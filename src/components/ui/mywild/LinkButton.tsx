import type { MouseEventHandler, ReactNode } from 'react';
import { Html_LinkButton } from '../implementations/html/link-button/Html_LinkButton';

type Props = {
    children: ReactNode | ReactNode[];
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    disabled?: boolean;
    renderAsSpan?: boolean;
}

export function LinkButton({ children, onClick, disabled, renderAsSpan }: Props) {
    return (
        <Html_LinkButton
            onClick={onClick}
            disabled={disabled}
            renderAsSpan={renderAsSpan}
        >
            {children}
        </Html_LinkButton>
    );
}