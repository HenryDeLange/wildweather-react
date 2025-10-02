import type { LinkProps } from '@tanstack/react-router';
import { BaseUI_NavigationMenu } from '../implementations/base-ui/navigation-menu/BaseUI_NavigationMenu';

type MenuItem = {
    title: string;
    description: string;
    href: LinkProps['to'];
    forceReload?: boolean;
}

type Menu = {
    title: string;
    href?: LinkProps['to'];
    forceReload?: boolean;
    items: MenuItem[];
    itemsLoading?: boolean;
    variant: 'grid' | 'flat';
}

type MenuLink = {
    title: string;
    href: LinkProps['to'];
    forceReload?: boolean;
}

type Props = {
    menus: (Menu | MenuLink)[];
}

export function NavigationMenu({ menus }: Props) {
    return (
        <BaseUI_NavigationMenu menus={menus} />
    );
}