import { createContext } from 'react';

export type PwaContextType = {
    isPwa: boolean;
    showPwaInstallButton: boolean;
    handleInstallClick: () => Promise<void>;
}

export const PwaContext = createContext<PwaContextType>({
    isPwa: false,
    showPwaInstallButton: false,
    handleInstallClick: async () => Promise.resolve()
});
