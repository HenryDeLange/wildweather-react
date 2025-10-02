import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { PwaContext, type PwaContextType } from './pwaContext';

type Props = {
    children: ReactNode;
}

export function PwaProvider({ children }: Readonly<Props>) {
    // Is PWA
    const isPwa = window.matchMedia('(display-mode: standalone)').matches;

    // PWA Install
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPwaInstallButton, setShowPwaInstallButton] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            console.debug('PWA: Event received');
            // event.preventDefault(); // Show the browser default install UI as well
            setInstallPrompt(event as BeforeInstallPromptEvent);
            setShowPwaInstallButton(true);
        };

        const handleAppInstalled = () => {
            console.debug('PWA: Installed');
            setInstallPrompt(null);
            setShowPwaInstallButton(false);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = useCallback(async () => {
        if (!installPrompt) return;
        const promptEvent = installPrompt;
        const result = await promptEvent.prompt();
        console.debug(`PWA: The install prompt outcome is ${result.outcome}`);
        setInstallPrompt(null);
        setShowPwaInstallButton(false);
        window.location.reload();
    }, [installPrompt]);

    // RENDER
    return (
        <PwaContext.Provider
            value={
                useMemo<PwaContextType>(() => ({
                    isPwa,
                    showPwaInstallButton,
                    handleInstallClick
                }), [isPwa, showPwaInstallButton, handleInstallClick])
            }
        >
            {children}
        </PwaContext.Provider>
    );
}

// PWA Install
type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<{ outcome: 'accepted' | 'dismissed', platform?: string }>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    platforms?: Promise<string[]>;
}
