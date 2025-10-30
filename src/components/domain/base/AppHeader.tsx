import { useLocation, useNavigate } from '@tanstack/react-router';
import { ArrowBigDownDash } from 'lucide-react';
import { useCallback, useContext, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { authLogout, selectIsAuthenticated } from '../../../auth/authSlice';
import { PwaContext } from '../../../pwa/pwaContext';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Box, HBox, HideOnMobile, ShowOnMobile, VBox } from '../../ui/layout';
import { Button, Heading, LanguageToggle, LinkButton, NavigationMenu, RouterLink, Separator, Text } from '../../ui/mywild';
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

    const { isPwa, showPwaInstallButton, handleInstallClick } = useContext(PwaContext);

    const handleLogout = useCallback(() => {
        dispatch(authLogout());
        navigate({ to: '/' });
    }, [dispatch, navigate]);

    const menus = [
        {
            title: t('stationsButton'),
            href: '/stations'
        },
        {
            title: t('aboutButton'),
            href: '/about'
        }
    ];

    return (
        <VBox marginTop='0.25rem'>
            <HBox marginLeft='0.5rem' marginRight='0.5rem'>
                <HBox gap='0.25rem'>
                    <ShowOnMobile>
                        <HBox marginRight='0.5rem'>
                            <Drawer
                                heading={
                                    <HBox gap='0.25rem'>
                                        <img src='/pwa-64x64.png' width={32} height={32} />
                                        <Heading>
                                            {t('appTitle')}
                                        </Heading>
                                    </HBox>
                                }
                                menus={[
                                    ...(isAuthenticated
                                        ? [
                                            {
                                                title: t('adminButton'),
                                                href: '/admin'
                                            }
                                        ]
                                        : []),
                                    ...menus,
                                    {
                                        render: (
                                            <HBox>
                                                <Text variant='subdued'>
                                                    {t('languageTitle')}
                                                </Text>
                                                <LanguageToggle />
                                            </HBox>
                                        ),
                                        closeOnClick: false
                                    }
                                ]}
                            />
                        </HBox>
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
                {!isPwa && showPwaInstallButton &&
                    <>
                        <HideOnMobile>
                            <Button
                                onClick={handleInstallClick}
                                icon={<ArrowBigDownDash size='1.2rem' />}
                            >
                                {t('pwaInstall')}
                            </Button>
                        </HideOnMobile>
                        <ShowOnMobile>
                            <Button
                                onClick={handleInstallClick}
                                icon={<ArrowBigDownDash size='1.1rem' />}
                            />
                        </ShowOnMobile>
                    </>
                }
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
                                ...menus
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
