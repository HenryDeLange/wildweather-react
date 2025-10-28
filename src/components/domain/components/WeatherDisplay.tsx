import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWeatherQuery, useGetWeatherStationsQuery, useGetWeatherStatusQuery, type GetWeatherApiArg } from '../../../redux/api/wildweatherApi';
import { Box, HBox, VBox } from '../../ui/layout';
import { LabeledText, Popover, Select, Spinner, Text } from '../../ui/mywild';
import { Checkbox } from '../../ui/mywild/Checkbox';
import { ErrorDisplay } from '../base/ErrorDisplay';
import { type CategoryType, type WeatherFieldType } from './types';
import { generateCategories, WeatherChart } from './WeatherChart';

export function WeatherDisplay() {
    const { t } = useTranslation();

    const [chart, setCart] = useState<WeatherFieldType>('TEMPERATURE');
    const [station, setStation] = useState<GetWeatherApiArg['station']>();
    const [grouping, setGrouping] = useState<GetWeatherApiArg['grouping']>('MONTHLY');
    const [category, setCategory] = useState<CategoryType>('ALL');
    const [aggregate, setAggregate] = useState<GetWeatherApiArg['aggregate']>('AVERAGE');
    const [month, setMonth] = useState<string | undefined>();
    const [year, setYear] = useState<string | undefined>();
    const [showMissing, setShowMissing] = useState<boolean>(false);

    const {
        data: weatherData,
        isLoading: weatherIsLoading,
        error: weatherError
    } = useGetWeatherQuery({
        station,
        grouping,
        weatherFields: (chart !== 'MISSING' && showMissing) ? [chart, 'MISSING'] : [chart],
        category: category === 'ALL' ? undefined : category,
        aggregate,
        startDate: year ? new Date(Number(year), 1, 1).toISOString().substring(0, 10) : undefined,
        endDate: year ? new Date(Number(year), 11, 31).toISOString().substring(0, 10) : undefined,
        startMonth: month ? Number(month) : undefined,
        endMonth: month ? Number(month) : undefined
    });

    const {
        data: stationsData,
        isLoading: stationsIsLoading,
        error: stationsError
    } = useGetWeatherStationsQuery();

    const {
        data: statusData,
        isLoading: statusIsLoading,
        error: statusError
    } = useGetWeatherStatusQuery();

    const isLoading = weatherIsLoading || stationsIsLoading || statusIsLoading;
    const chartGrouping = grouping;
    const chartType = chart;

    return (
        <VBox fullWidth gap={0}>
            <HBox margin='0.5rem' gap='0.5rem'>
                <Select
                    items={[
                        'TEMPERATURE',
                        'RAIN_DAILY',
                        'WIND_SPEED',
                        'WIND_MAX',
                        'WIND_DIRECTION',
                        'HUMIDITY',
                        'UV_RADIATION_INDEX',
                        'MISSING'
                    ].map(value => ({ label: t(`filterChart${value}`), value }))}
                    value={chart}
                    onValueChange={value => setCart(!value ? chart : value as WeatherFieldType)}
                />
                <Select
                    items={['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'].map(value => ({ label: t(`filterGroup${value}`), value }))}
                    value={grouping}
                    onValueChange={value => setGrouping(!value ? grouping : value as GetWeatherApiArg['grouping'])}
                />
                <Select
                    items={['AVERAGE', 'TOTAL'].map(value => ({ label: t(`filterAggregate${value}`), value }))}
                    value={aggregate}
                    onValueChange={value => setAggregate(!value ? aggregate : value as GetWeatherApiArg['aggregate'])}
                />
                <Select
                    items={['L', 'A', 'H', 'ALL'].map(value => ({ label: t(`filterCategory${value}`), value }))}
                    value={category}
                    onValueChange={value => setCategory(!value ? category : value as CategoryType)}
                />
                <Select
                    items={stationsData?.map(station => ({ label: station, value: station })) ?? []}
                    value={station}
                    onValueChange={value => setStation(!value ? undefined : value)}
                    placeholder={t('filterStation')}
                />
                <Select
                    items={generateCategories('YEARLY').map(value => ({ label: value, value }))}
                    value={year}
                    onValueChange={value => setYear(value === null ? undefined : value)}
                    placeholder={t('filterYear')}
                />
                <Select
                    items={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(value => ({ label: t(`filterMonth${value}`), value }))}
                    value={month}
                    onValueChange={value => setMonth(value === null ? undefined : value)}
                    placeholder={t('filterMonth')}
                />
                <Checkbox
                    checked={showMissing}
                    onCheckedChange={checked => setShowMissing(checked)}
                    placeholder={t('showMissing')}
                >
                    {showMissing ? t('showMissing') : undefined}
                </Checkbox>
                <Box marginLeft='auto'>
                    <Popover
                        trigger={
                            <LabeledText
                                label={t('lastUpdated')}
                                text={
                                    <Text size='small'>
                                        {statusData?.reduce((hasLatestDate, stationStatus) =>
                                            stationStatus.lastProcessedOn > hasLatestDate.lastProcessedOn ? stationStatus : hasLatestDate)
                                            .lastProcessedOn ?? ''}
                                    </Text>
                                }
                            />
                        }
                        description={
                            <VBox>
                                {statusData?.map(stationStatus => (
                                    <LabeledText
                                        label={stationStatus.station}
                                        text={
                                            <Text size='small'>
                                                {stationStatus.lastProcessedOn}
                                            </Text>
                                        }
                                    />
                                ))}
                            </VBox>
                        }
                    />

                </Box>
            </HBox>
            <ErrorDisplay error={weatherError || stationsError || statusError} />
            {isLoading &&
                <Box marginLeft='auto' marginRight='auto'>
                    <Spinner />
                </Box>
            }
            {weatherData &&
                <WeatherChart
                    type={chartType}
                    loading={isLoading}
                    data={weatherData.weather}
                    grouping={chartGrouping}
                    category={category}
                    showMissing={showMissing}
                />
            }
        </VBox>

    );
}