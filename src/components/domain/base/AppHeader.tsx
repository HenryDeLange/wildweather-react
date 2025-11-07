import { useLocation, useNavigate } from '@tanstack/react-router';
import { ArrowBigDownDash } from 'lucide-react';
import { useCallback, useContext, useMemo, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { authLogout, selectIsAuthenticated } from '../../../auth/authSlice';
import { PwaContext } from '../../../pwa/pwaContext';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Box, HBox, HideOnMobile, ShowOnMobile, VBox } from '../../ui/layout';
import { Button, Heading, LanguageToggle, LinkButton, NavigationMenu, RouterLink, Separator, Text } from '../../ui/mywild';
import { Drawer } from '../../ui/mywild/Drawer';
import { WeatherStationStatus } from '../components/WeatherStationStatus';
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

    const homeMenu = useMemo(() => ({
        title: t('homeButton'),
        href: '/'
    }), [t]);

    const menus = useMemo(() => [
        {
            title: t('stationsButton'),
            href: '/stations'
        },
        {
            title: t('aboutButton'),
            href: '/about'
        }
    ], [t]);

    const authButtons = useMemo(() => (!isAuthenticated ? (
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
    ) : (
        <Box marginLeft='auto'>
            <LinkButton onClick={handleLogout}>
                {t('logoutButton')}
            </LinkButton>
        </Box>
    )), [isAuthenticated, routePathName, t, handleLogout]);

    const logo = <img src='/wildweather-logo.png' width={32} height={32} style={{ borderRadius: '35%' }} />;
    const smallLogo = <img src='/wildweather-logo.png' width={16} height={16} style={{ borderRadius: '25%' }} />;

    return (
        <VBox marginTop='0.25rem'>
            <HBox marginLeft='0.5rem' marginRight='0.5rem'>
                <HBox gap='0.25rem'>
                    <ShowOnMobile>
                        <HBox marginRight='0.5rem'>
                            <Drawer
                                heading={
                                    <HBox gap='0.25rem'>
                                        {logo}
                                        <Heading>
                                            {t('appTitle')}
                                        </Heading>
                                    </HBox>
                                }
                                menus={[
                                    homeMenu,
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
                                        render: authButtons,
                                        closeOnClick: true
                                    },
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
                            {logo}
                        </RouterLink>
                    </HideOnMobile>
                    <ShowOnMobile useHardCutoff>
                        <RouterLink to='/'>
                            {smallLogo}
                        </RouterLink>
                    </ShowOnMobile>
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
                <Box marginLeft='auto' marginRight='auto'>
                    <WeatherStationStatus />
                </Box>
                <HideOnMobile>
                    {authButtons}
                </HideOnMobile>
            </HBox>
            <Separator marginTop='-0.75rem' />
        </VBox>
    );
}
