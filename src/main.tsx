import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { ToastProvider } from './components/ui/toast/ToastProvider.tsx';
import i18n from './i18n/i18n';
import './main.css';
import './main.module.css';
import './main.scss';
import { PwaProvider } from './pwa/PwaProvider.tsx';
import { store } from './redux/store.ts';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
};

document.title = i18n.t('appTitle');

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary fallback={
        <div style={{ textAlign: 'center', verticalAlign: 'center', width: '100%', height: '100%' }}>
            <h1>🔥💥🔥 😶‍🌫️ 🔥💥🔥</h1>
            <p>Unexpected Error!</p>
        </div>
    }>
        <StrictMode>
            <PwaProvider>
                <Provider store={store}>
                    <ToastProvider>
                        <div className='root'>
                            <RouterProvider router={router} />
                        </div>
                    </ToastProvider>
                </Provider>
            </PwaProvider>
        </StrictMode>
    </ErrorBoundary>
);
