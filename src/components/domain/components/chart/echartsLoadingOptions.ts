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
        color: '#185180ff',
        textColor: '#23426bff',
        maskColor: '#868c8d9d',
        zlevel: 0,
        fontSize: 16,
        showSpinner: true,
        spinnerRadius: 10,
        lineWidth: 5,
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontFamily: 'sans-serif'
    };
}
