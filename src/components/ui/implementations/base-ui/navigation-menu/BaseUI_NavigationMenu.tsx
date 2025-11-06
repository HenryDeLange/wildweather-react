import { NavigationMenu } from '@base-ui-components/react/navigation-menu';
import { type LinkProps } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import { Spinner } from '../../../mywild';
import { Heading } from '../../../mywild/Heading';
import { Text } from '../../../mywild/Text';
import { ArrowSvg } from './BaseUI_ArrowSvg';
import styles from './BaseUI_NavigationMenu.module.css';
import { BaseUI_NavLink } from './BaseUI_NavLink';

// https://base-ui.com/react/components/navigation-menu

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

export function BaseUI_NavigationMenu({ menus }: Props) {
    return (
        <NavigationMenu.Root className={styles.Root}>
            <NavigationMenu.List className={styles.List}>
                {menus.map(menu => (
                    ('items' in menu)
                        ? (
                            <NavigationMenu.Item key={menu.title}>
                                <NavigationMenu.Trigger className={styles.Trigger}>
                                    {menu.href
                                        ?
                                        <BaseUI_NavLink
                                            key={menu.title}
                                            className={styles.LinkCard}
                                            href={menu.href} forceReload={menu.forceReload}
                                        >
                                            {menu.title}
                                        </BaseUI_NavLink>
                                        :
                                        <Text>
                                            {menu.title}
                                        </Text>
                                    }
                                    <NavigationMenu.Icon className={styles.Icon}>
                                        <ChevronDown />
                                    </NavigationMenu.Icon>
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content className={styles.Content}>
                                    {menu.itemsLoading &&
                                        <Spinner />
                                    }
                                    {!menu.itemsLoading &&
                                        <div className={menu.variant === 'flat' ? styles.FlexLinkList : styles.GridLinkList}>
                                            {menu.items.map((item) => (
                                                <div key={item.title} className={styles.LinkCard}>
                                                    <BaseUI_NavLink
                                                        className={styles.LinkCard}
                                                        href={item.href} forceReload={item.forceReload}
                                                    >
                                                        <Heading size='small'>
                                                            {item.title}
                                                        </Heading>
                                                        <Text variant='subdued' size='small'>
                                                            {item.description}
                                                        </Text>
                                                    </BaseUI_NavLink>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>
                        )
                        : (
                            <BaseUI_NavLink
                                key={menu.title}
                                className={styles.Trigger}
                                href={menu.href}
                                forceReload={menu.forceReload}
                            >
                                {menu.title}
                            </BaseUI_NavLink>
                        )
                ))}
            </NavigationMenu.List>
            <NavigationMenu.Portal>
                <NavigationMenu.Positioner
                    className={styles.Positioner}
                    sideOffset={10}
                    collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
                    collisionAvoidance={{ side: 'none' }}
                >
                    <NavigationMenu.Popup className={styles.Popup}>
                        <NavigationMenu.Arrow className={styles.Arrow}>
                            <ArrowSvg />
                        </NavigationMenu.Arrow>
                        <NavigationMenu.Viewport className={styles.Viewport} />
                    </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
        </NavigationMenu.Root>
    );
}
