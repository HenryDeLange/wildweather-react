import type { LinkProps } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { Tanstack_RouterLink } from '../implementations/tanstack-router/router-link/Tanstack_RouterLink';

type ImplementationType = ComponentProps<typeof Tanstack_RouterLink>;

type Props = {
    children: ImplementationType['children'];
    to: LinkProps['to'];
    params?: LinkProps['params'];
    search?: LinkProps['search'];
    forceReload?: ImplementationType['reloadDocument'];
    disabled?: ImplementationType['disabled'];
}

export function RouterLink({ forceReload, ...props }: Props) {
    return (
        <Tanstack_RouterLink  {...props} reloadDocument={forceReload} />
    );
}