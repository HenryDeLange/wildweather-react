import type { LinkProps } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { Box, HBox, VBox } from '../../../layout';
import { Button, Heading, RouterLink } from '../../../mywild';
import styles from './Html_Drawer.module.css';

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

export function Html_Drawer({ heading, menus }: Props) {
    const [open, setOpen] = useState(false);

    // const startX = useRef<number | null>(null);
    // useEffect(() => {
    //     const handleTouchStart = (e: TouchEvent) => {
    //         startX.current = e.touches[0].clientX;
    //     };

    //     const handleTouchMove = (e: TouchEvent) => {
    //         if (startX.current !== null) {
    //             const currentX = e.touches[0].clientX;
    //             const deltaX = currentX - startX.current;
    //             if (!open && deltaX > 50) setOpen(true);
    //             if (open && deltaX < -50) setOpen(false);
    //         }
    //     };

    //     const handleTouchEnd = () => {
    //         startX.current = null;
    //     };

    //     document.addEventListener('touchstart', handleTouchStart);
    //     document.addEventListener('touchmove', handleTouchMove);
    //     document.addEventListener('touchend', handleTouchEnd);

    //     return () => {
    //         document.removeEventListener('touchstart', handleTouchStart);
    //         document.removeEventListener('touchmove', handleTouchMove);
    //         document.removeEventListener('touchend', handleTouchEnd);
    //     };
    // }, [open]);

    const isText = typeof heading === 'string' || typeof heading === 'number';
    return (
        <>
            <Button onClick={() => setOpen(!open)}>
                ☰
            </Button>
            <div className={open ? `${styles.drawer} ${styles.open}` : styles.drawer}>
                <VBox fullWidth>
                    <HBox>
                        <RouterLink to='/'>
                            <div onClick={() => setOpen(false)}>
                                {isText
                                    ?
                                    <Heading>
                                        {heading}
                                    </Heading>
                                    :
                                    heading
                                }
                            </div>
                        </RouterLink>
                        <Box marginLeft='auto'>
                            <button className={styles.close} onClick={() => setOpen(false)}>
                                ×
                            </button>
                        </Box>
                    </HBox>
                    <nav>
                        <VBox gap='1.5rem' marginTop='2rem' fullWidth>
                            {menus.map((menu, index) => (
                                <div
                                    key={menu.title ?? index}
                                    style={{ width: 'fit-content' }}
                                    onClick={menu.closeOnClick ? () => setOpen(false) : undefined}
                                >
                                    {menu.title &&
                                        <RouterLink to={menu.href as LinkProps['to']}>
                                            {menu.title}
                                        </RouterLink>
                                    }
                                    {menu.render &&
                                        <>
                                            {menu.render}
                                        </>
                                    }
                                </div>
                            ))}
                        </VBox>
                    </nav>
                </VBox>
            </div>
            {open &&
                <div className={styles.overlay} onClick={() => setOpen(false)} />
            }
        </>
    );
}