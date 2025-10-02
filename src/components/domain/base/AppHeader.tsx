import { useLocation, useNavigate } from '@tanstack/react-router';
import { useCallback, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { authLogout, selectIsAuthenticated } from '../../../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Box, HBox, HideOnMobile, ShowOnMobile, VBox } from '../../ui/layout';
import { Heading, LanguageToggle, LinkButton, NavigationMenu, RouterLink, Separator, Text } from '../../ui/mywild';
import { Drawer } from '../../ui/mywild/Drawer';
import type { LoginRedirectType } from '../pages/user/LoginPage';

export function AppHeader() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const routePathName = useLocation({
        select: location => location.pathname,
    });

    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const handleLogout = useCallback(() => {
        dispatch(authLogout());
        navigate({ to: '/' });
    }, [dispatch, navigate]);

    return (
        <VBox>
            <HBox>
                <HBox gap='0.25rem'>
                    <ShowOnMobile>
                        <Drawer
                            heading={t('appTitle')}
                            menus={[
                                ...(isAuthenticated
                                    ? [
                                        {
                                            title: t('adminButton'),
                                            href: '/admin'
                                        }
                                    ]
                                    : []),
                                {
                                    title: t('aboutButton'),
                                    href: '/about'
                                },
                                {
                                    render: (
                                        <HBox>
                                            <Text variant='subdued'>
                                                Language
                                            </Text>
                                            <LanguageToggle />
                                        </HBox>
                                    ),
                                    closeOnClick: false
                                }
                            ]}
                        />
                    </ShowOnMobile>
                    <HideOnMobile useHardCutoff>
                        <RouterLink to='/'>
                            <img src='/pwa-64x64.png' width={32} height={32} />
                        </RouterLink>
                    </HideOnMobile>
                    <HideOnMobile>
                        <HBox gap='0.25rem'>
                            <RouterLink to='/'>
                                <Heading variant='priority' size='sub-title'>
                                    {t('appTitle')}
                                </Heading>
                            </RouterLink>
                            <LanguageToggle />
                        </HBox>
                    </HideOnMobile>
                    <ShowOnMobile>
                        <RouterLink to='/'>
                            <Text size='large'>
                                {t('appTitle')}
                            </Text>
                        </RouterLink>
                    </ShowOnMobile>
                </HBox>
                <Box marginLeft='auto' marginRight='auto'>
                    <HideOnMobile>
                        <NavigationMenu
                            menus={[
                                ...(isAuthenticated
                                    ? [
                                        {
                                            title: t('adminButton'),
                                            href: '/admin'
                                        }
                                    ]
                                    : []),
                                {
                                    title: t('aboutButton'),
                                    href: '/about'
                                }
                            ] as ComponentProps<typeof NavigationMenu>['menus']}
                        />
                    </HideOnMobile>
                </Box>
                {!isAuthenticated
                    ?
                    <Box marginLeft='auto'>
                        <HBox gap='1rem'>
                            <RouterLink
                                to='/login'
                                search={{
                                    redirect: (routePathName === '/login' || routePathName === '/register')
                                        ? '/'
                                        : routePathName
                                } as LoginRedirectType}
                            >
                                {t('loginButton')}
                            </RouterLink>
                        </HBox>
                    </Box>
                    :
                    <Box marginLeft='auto'>
                        <LinkButton onClick={handleLogout}>
                            {t('logoutButton')}
                        </LinkButton>
                    </Box>
                }
            </HBox>
            <Separator marginTop='-0.75rem' />
        </VBox>
    );
}
