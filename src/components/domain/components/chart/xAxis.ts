import type { CategoryAxisBaseOption } from 'echarts/types/src/coord/axisCommonTypes.js';
import { useTranslation } from 'react-i18next';
import type { WeatherChartProps } from './WeatherChart';

export function useGenerateXAxis(grouping: WeatherChartProps['grouping'], month: WeatherChartProps['month']): CategoryAxisBaseOption {
    const labels = getLabels(grouping, month);
    return {
        type: 'category',
        data: labels
    };
}

function getLabels(grouping: WeatherChartProps['grouping'], month: WeatherChartProps['month']): string[] {
    const { i18n } = useTranslation();
    switch (grouping) {
        case 'DAILY': {
            const days: string[] = [];
            const startDate = new Date(2024, (month ?? 1) - 1, 1); // 2024 is a leap year
            const formatter = new Intl.DateTimeFormat(i18n.language, {
                day: '2-digit',
                month: 'short'
            });
            const start = month ? startDate.getDate() : 1; // 2024 is a leap year
            const end = month ? new Date(2024, month, 0).getDate() : 366; // 366 for leap year
            for (let i = start; i <= end; i++) {
                const date = new Date(startDate);
                date.setDate(i);
                days.push(formatter.format(date));
            }
            return days;
        }
        case 'WEEKLY': {
            const weeks: string[] = [];
            const start = month ? Number(validWeekRangeForMonth(month)[0]) : 1;
            const end = month ? Number(validWeekRangeForMonth(month)[1]) : 53;
            for (let i = start; i <= end; i++) {
                weeks.push(String(i).padStart(2, '0'));
            }
            return weeks;
        }
        case 'MONTHLY': {
            const months: string[] = [];
            const start = month ? (month - 1) : 0;
            const end = month ? month : 12;
            const monthFormatter = new Intl.DateTimeFormat(i18n.language, {
                month: 'long'
            });
            for (let i = start; i < end; i++) {
                const month = new Date(2025, i, 1);
                months.push(monthFormatter.format(month));
            }
            return months;
        }
        case 'YEARLY': {
            const years: string[] = [];
            for (let i = 2023; i <= new Date().getFullYear(); i++) {
                years.push(String(i));
            }
            return years;
        }
        default:
            return [];
    }
}

const monthWeeks = [
    ['01', '06'],
    ['05', '09'],
    ['09', '14'],
    ['13', '18'],
    ['17', '22'],
    ['22', '27'],
    ['26', '31'],
    ['31', '36'],
    ['35', '40'],
    ['40', '44'],
    ['44', '49'],
    ['48', '53']
];

function validWeekRangeForMonth(month: number) {
    return monthWeeks[month - 1];
}
