import { SlidersHorizontal } from 'lucide-react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWeatherStationsQuery } from '../../../redux/api/wildweatherApi';
import { Box, FixedGrid, Grid, HideOnMobile, ShowOnMobile } from '../../ui/layout';
import { Form, FormField, Popover } from '../../ui/mywild';
import { useGenerateXAxis } from './chart/xAxis';
import { WeatherData } from './WeatherData';
import type { WeatherFilterType } from './weatherTypes';

type Props = {
    children: ReactElement<typeof WeatherData>;
};

export function WeatherFilter({ children }: Props) {
    return (
        <Form<WeatherFilterType>
            formProps={{
                defaultValues: {
                    type: 'TEMPERATURE',
                    station: null,
                    grouping: 'MONTHLY',
                    category: 'A',
                    aggregate: 'AVERAGE',
                    month: null,
                    year: null
                }
            }}
        >
            <ShowOnMobile>
                <FixedGrid
                    columnCount={4}
                    margin='0.1rem 0.2rem'
                    fitCellWidth
                    singleColumnOnMobile={false}
                    firstColumnIsPrimary
                >
                    <BaseFormFields />
                    <Box margin='0.25rem'>
                        <Popover
                            trigger={<SlidersHorizontal />}
                            description={
                                <Grid>
                                    <AdditionalFormFields />
                                </Grid>
                            }
                        />
                    </Box>
                </FixedGrid>
            </ShowOnMobile>
            <HideOnMobile>
                <Grid margin='0.25rem 0.5rem'>
                    <BaseFormFields />
                    <AdditionalFormFields />
                </Grid>
            </HideOnMobile>
            <>{children}</>
        </Form>
    );
}

function BaseFormFields() {
    const { t } = useTranslation();

    return (
        <>
            <FormField<WeatherFilterType>
                formControl={{
                    name: 'type'
                }}
                type='list'
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
                forceNotEmpty
            />
            <FormField<WeatherFilterType>
                formControl={{
                    name: 'grouping'
                }}
                type='list'
                items={[
                    'DAILY',
                    'WEEKLY',
                    'MONTHLY',
                    'YEARLY'
                ].map(value => ({ label: t(`filterGroup${value}`), value }))}
                forceNotEmpty
            />
            <FormField<WeatherFilterType>
                formControl={{
                    name: 'category'
                }}
                type='list'
                items={[
                    'H',
                    'A',
                    'L',
                    'ALL'
                ].map(value => ({ label: t(`filterCategory${value}`), value }))}
                forceNotEmpty
            />
        </>
    );
}

function AdditionalFormFields() {
    const { t } = useTranslation();

    const {
        data: stationsData,
        // isFetching: stationsIsLoading,
        // error: stationsError
    } = useGetWeatherStationsQuery();

    return (
        <>
            <FormField<WeatherFilterType>
                formControl={{
                    name: 'aggregate'
                }}
                type='list'
                items={[
                    'AVERAGE',
                    'TOTAL'
                ].map(value => ({ label: t(`filterAggregate${value}`), value }))}
                forceNotEmpty
            />
            <FormField<WeatherFilterType>
                formControl={{
                    name: 'station'
                }}
                type='list'
                items={stationsData?.map(value => ({ label: value, value })) ?? []}
                placeholder={t('filterStation')}
            />
            <FormField<WeatherFilterType>
                formControl={{
                    name: 'year'
                }}
                type='list'
                items={(useGenerateXAxis('YEARLY', null, null).data?.reverse() as string[])
                    .map((value: string) => ({ label: value, value }))}
                placeholder={t('filterYear')}
            />
            <FormField<WeatherFilterType>
                formControl={{
                    name: 'month'
                }}
                type='list'
                items={[
                    '01',
                    '02',
                    '03',
                    '04',
                    '05',
                    '06',
                    '07',
                    '08',
                    '09',
                    '10',
                    '11',
                    '12'
                ].map(value => ({ label: t(`filterMonth${value}`), value }))}
                placeholder={t('filterMonth')}
            />
        </>
    );
}
