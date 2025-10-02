import type { LinkProps } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Html_Drawer } from '../implementations/html/drawer/Html_Drawer';

type Menu = {
    title: string;
    href: LinkProps['to'];
    render?: never;
    closeOnClick?: never;
}

type MenuLink = {
    title: string;
    href: string;
    render?: never;
    closeOnClick?: never;
}

type MenuComponent = {
    title?: never;
    href?: never;
    render: ReactNode | ReactNode[];
    closeOnClick?: boolean;
}

type Props = {
    heading: ReactNode | ReactNode[];
    menus: (Menu | MenuLink | MenuComponent)[];
}

export function Drawer({ heading, menus }: Props) {
    return (
        <Html_Drawer heading={heading} menus={menus} />
    );
}