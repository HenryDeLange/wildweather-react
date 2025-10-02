import type { MouseEventHandler, ReactNode } from 'react';
import { Html_Button } from '../implementations/html/button/Html_Button';

type Props = {
    children: ReactNode | ReactNode[];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'standard' | 'priority' | 'error' | 'warning';
    type?: 'button' | 'submit';
    size?: 'standard' | 'large' | 'small';
}

export function Button({ children, onClick, disabled, loading, variant, type, size }: Props) {
    return (
        <Html_Button
            type={type}
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            variant={variant}
            size={size}
        >
            {children}
        </Html_Button>
    );
}