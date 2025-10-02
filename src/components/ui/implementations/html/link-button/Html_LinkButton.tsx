import type { MouseEventHandler, ReactNode } from 'react';
import { Text } from '../../../mywild/Text';
import styles from './Html_LinkButton.module.css';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a

type Props = {
    children: ReactNode | ReactNode[];
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    disabled?: boolean;
    renderAsSpan?: boolean;
}

export function Html_LinkButton({ children, onClick, disabled, renderAsSpan }: Props) {
    const isText = typeof children === 'string' || typeof children === 'number';
    if (renderAsSpan) {
        return (
            <span
                className={styles.Link}
                onClick={!disabled ? onClick : undefined}
                aria-disabled={disabled}
                data-disabled={disabled}
            >
                {isText
                    ? <Text variant={disabled ? 'subdued' : 'standard'}>{children}</Text>
                    : children
                }
            </span>
        );
    }
    return (
        <a
            className={styles.Link}
            onClick={!disabled ? onClick : undefined}
            aria-disabled={disabled}
            data-disabled={disabled}
        >
            {isText
                ? <Text variant={disabled ? 'subdued' : 'standard'}>{children}</Text>
                : children
            }
        </a>
    );
}