import type { GetWeatherApiArg } from '../../../redux/api/wildweatherApi';

export type WeatherFieldType = NonNullable<GetWeatherApiArg['weatherFields']>[number];

export type CategoryType = NonNullable<GetWeatherApiArg['category']> | 'ALL';

export type CategoryValueType = {
    [K in CategoryType]: number;
}

export type FieldPropertyType = 'tmp' | 'wSp' | 'wMx' | 'wDr' | 'rRt' | 'rDy' | 'prs' | 'hmd' | 'uvI' | 'mis';

export type GroupedFieldType = {
    [K in FieldPropertyType]: CategoryValueType;
}

