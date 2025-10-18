import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppHeader } from '../components/domain/base/AppHeader';
import { ErrorDisplay } from '../components/domain/base/ErrorDisplay';
import i18n from '../i18n/i18n';
import styles from './__root.module.css';

export const Route = createRootRoute({
    component: () => (
        <div className={styles.RouteComponent}>
            <AppHeader />
            <Outlet />
            <TanStackRouterDevtools />
        </div>
    ),
    notFoundComponent: () => (
        <ErrorDisplay error={{ code: '404', message: i18n.t('errorPageNotFound') }} />
    ),
    errorComponent: ({ error }) => (
        <ErrorDisplay error={error} />
    )
});
