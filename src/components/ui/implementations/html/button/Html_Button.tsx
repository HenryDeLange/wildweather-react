import type { MouseEventHandler, ReactNode } from 'react';
import { Box } from '../../../layout/box/Box';
import { Spinner } from '../../../mywild/Spinner';
import { Text } from '../../../mywild/Text';
import styles from './Html_Button.module.css';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button

type Props = {
    children?: ReactNode | ReactNode[];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'standard' | 'priority' | 'error' | 'warning';
    type?: 'button' | 'submit';
    size?: 'standard' | 'large' | 'small';
    icon?: ReactNode;
}

export function Html_Button({ children, onClick, disabled, loading, variant, type = 'button', size, icon }: Props) {
    const isText = typeof children === 'string' || typeof children === 'number';
    return (
        <button
            type={type}
            className={styles.Button}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            data-variant={variant}
            data-size={size}
        >
            {(loading || icon) &&
                <Box marginRight={children ? '0.5rem' : undefined}>
                    {loading && <Spinner size='small' />}
                    {(!loading && icon) && <>{icon}</>}
                </Box>
            }
            {isText
                ? <Text variant={disabled ? 'subdued' : variant} size={size}>{children}</Text>
                : children
            }
        </button>
    );
}