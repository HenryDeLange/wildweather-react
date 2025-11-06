import { useTranslation } from 'react-i18next';

// A type for LoadingOption does not seem to exist in the library, so defining my own based on:
// https://echarts.apache.org/en/api.html#echartsInstance.showLoading
type LoadingOption = {
    text?: string;
    color?: string;
    textColor?: string;
    maskColor?: string;
    zlevel?: number;
    fontSize?: number;
    showSpinner?: boolean;
    spinnerRadius?: number;
    lineWidth?: number;
    fontWeight?: string | number;
    fontStyle?: string;
    fontFamily?: string;
}

export function useEChartsLoadingOption(): LoadingOption {
    const { t } = useTranslation();
    return {
        text: t('chartLoading'),
        color: '#20569cff',
        textColor: '#20569cff',
        maskColor: '#acacac9d',
        zlevel: 0,
        fontSize: 24,
        showSpinner: true,
        spinnerRadius: 12,
        lineWidth: 5,
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontFamily: 'sans-serif'
    };
}
