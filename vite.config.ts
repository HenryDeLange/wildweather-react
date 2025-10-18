import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
    define: {
        VITE_APP_VERSION: JSON.stringify(version)
    },
    plugins: [
        tanstackRouter({ // Make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
            target: 'react',
            autoCodeSplitting: true
        }),
        react(),
        tsconfigPaths(),
        visualizer(),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br'
        }),
        VitePWA({
            devOptions: {
                enabled: true
            },
            registerType: 'autoUpdate',
            strategies: 'generateSW',
            manifest: {
                name: 'WildWeather',
                short_name: 'WildWeather',
                description: 'WildWeather Web Portal.',
                theme_color: '#21809cff',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ],
                screenshots: [
                    {
                        src: 'pwa/screenshot-small.jpg',
                        sizes: '459x320',
                        type: 'image/png',
                        label: 'WildWeather'
                    },
                    {
                        src: 'pwa/screenshot-large.jpg',
                        sizes: '1296x904',
                        type: 'image/png',
                        label: 'WildWeather',
                        form_factor: 'wide'
                    }
                ],
                background_color: '#0d627cff',
                display: 'standalone',
                launch_handler: {
                    client_mode: [
                        'focus-existing',
                        'auto'
                    ]
                }
            }
        })
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: [
                        'react',
                        'react-dom'
                    ],
                    redux: [
                        'redux',
                        'react-redux',
                        '@reduxjs/toolkit',
                        'async-mutex'
                    ],
                    ui_base: [
                        '@base-ui-components/react',
                        'lucide-react'
                    ],
                    ui_form: [
                        'react-hook-form',
                        '@hookform/devtools'
                    ],
                    echarts: [
                        'echarts',
                        'echarts-for-react'
                    ],
                    routing: [
                        'react-error-boundary',
                        '@tanstack/react-router',
                        '@tanstack/react-router-devtools',
                        '@tanstack/router-devtools'
                    ],
                    i18n: [
                        'i18next',
                        'i18next-browser-languagedetector',
                        'react-i18next'
                    ]
                }
            }
        }
    }
});
