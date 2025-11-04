import { createLink } from '@tanstack/react-router';
import { forwardRef, type AnchorHTMLAttributes, type ComponentProps } from 'react';
import { Button } from '../../../mywild/Button';
import styles from './Tanstack_RouterButton.module.css';

// https://tanstack.com/router/latest/docs/framework/react/guide/custom-link

type BasicLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'standard' | 'priority';
    disabled?: ComponentProps<typeof Button>['disabled'];
    icon?: ComponentProps<typeof Button>['icon'];
}

export const Tanstack_RouterButton = createLink(forwardRef<HTMLAnchorElement, BasicLinkProps>(
    (props, ref) => {
        return (
            <a ref={ref} {...props} className={styles.RouterButton}>
                <Button variant={props.variant} disabled={props.disabled} icon={props.icon}>
                    {props.children}
                </Button>
            </a>
        )
    }
));
