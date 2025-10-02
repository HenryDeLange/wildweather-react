import { createLink } from '@tanstack/react-router';
import { type AnchorHTMLAttributes, type ComponentProps, forwardRef } from 'react';
import { LinkButton } from '../../../mywild/LinkButton';
import styles from './Tanstack_RouterLink.module.css';

// https://tanstack.com/router/latest/docs/framework/react/guide/custom-link

type BasicLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: ComponentProps<typeof LinkButton>['disabled'];
}

export const Tanstack_RouterLink = createLink(forwardRef<HTMLAnchorElement, BasicLinkProps>(
    (props, ref) => {
        return (
            <a ref={ref} {...props} className={styles.RouterLink}>
                <LinkButton disabled={props.disabled}  renderAsSpan>
                    {props.children}
                </LinkButton>
            </a>
        )
    }
));
