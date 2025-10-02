import { NavigationMenu } from '@base-ui-components/react/navigation-menu';
import { type LinkProps } from '@tanstack/react-router';
import { Spinner } from '../../../mywild';
import { Heading } from '../../../mywild/Heading';
import { RouterLink } from '../../../mywild/RouterLink';
import { Text } from '../../../mywild/Text';
import styles from './BaseUI_NavigationMenu.module.css';

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
                                        <NavLink
                                            key={menu.title}
                                            className={styles.LinkCard}
                                            href={menu.href} forceReload={menu.forceReload}
                                        >
                                            {menu.title}
                                        </NavLink>
                                        :
                                        <Text>
                                            {menu.title}
                                        </Text>
                                    }
                                    <NavigationMenu.Icon className={styles.Icon}>
                                        <ChevronDownIcon />
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
                                                    <NavLink
                                                        className={styles.LinkCard}
                                                        href={item.href} forceReload={item.forceReload}
                                                    >
                                                        <Heading size='small'>
                                                            {item.title}
                                                        </Heading>
                                                        <Text variant='subdued' size='small'>
                                                            {item.description}
                                                        </Text>
                                                    </NavLink>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>
                        )
                        : (
                            <NavLink
                                key={menu.title}
                                className={styles.Trigger}
                                href={menu.href}
                                forceReload={menu.forceReload}
                            >
                                {menu.title}
                            </NavLink>
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

function NavLink({ forceReload, ...props }: NavigationMenu.Link.Props & { forceReload?: boolean }) {
    return (
        <NavigationMenu.Link
            render={
                <RouterLink to={props.href as LinkProps['to']} forceReload={forceReload}>
                    {props.children}
                </RouterLink>
            }
            {...props}
        />
    );
}

function ChevronDownIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
            <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
        </svg>
    );
}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
    return (
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
            <path
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                className={styles.ArrowFill}
            />
            <path
                d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
                className={styles.ArrowOuterStroke}
            />
            <path
                d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
                className={styles.ArrowInnerStroke}
            />
        </svg>
    );
}