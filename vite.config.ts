import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
    define: {
        VITE_APP_VERSION: JSON.stringify(version)
    },
    resolve: {
        tsconfigPaths: true
    },
    plugins: [
        tanstackRouter({ // Make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
            target: 'react',
            autoCodeSplitting: true
        }),
        react(),
        svgr(),
        visualizer(),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br'
        }),
        {
            name: 'watch-public-folder',
            configureServer(server) {
                server.watcher.add('public/**');
                server.watcher.on('change', () => {
                    server.ws.send({ type: 'full-reload' });
                });
            }
        },
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
        rolldownOptions: {
            output: {
                manualChunks: (moduleId) => {
                    if (moduleId.includes('node_modules')) {
                        // React
                        if (/react|react-dom/.test(moduleId)) return 'react';
                        // Redux
                        if (/redux|react-redux|@reduxjs\/toolkit|async-mutex/.test(moduleId)) return 'redux';
                        // UI Base
                        if (/@base-ui\/react|lucide-react|usehooks-ts|typescript-color-gradient/.test(moduleId)) return 'ui_base';
                        // UI Form
                        if (/react-hook-form|@hookform\/devtools/.test(moduleId)) return 'ui_form';
                        // Charts
                        if (/echarts|echarts-for-react/.test(moduleId)) return 'echarts';
                        // Routing
                        if (/react-error-boundary|@tanstack\/react-router|@tanstack\/router/.test(moduleId)) return 'routing';
                        // i18n
                        if (/i18next|react-i18next/.test(moduleId)) return 'i18n';
                    }
                }
            }
        }
    }
});
