import type { LinkProps } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { Tanstack_RouterButton } from '../implementations/tanstack-router/router-button/Tanstack_RouterButton';

type ImplementationType = ComponentProps<typeof Tanstack_RouterButton>;

type Props = {
    children: ImplementationType['children'];
    to: LinkProps['to'];
    params?: LinkProps['params'];
    search?: LinkProps['search'];
    forceReload?: ImplementationType['reloadDocument'];
    disabled?: ImplementationType['disabled'];
    variant?: ImplementationType['variant'];
}

export function RouterButton({ forceReload, ...props }: Props) {
    return (
        <Tanstack_RouterButton {...props} reloadDocument={forceReload} />
    );
}