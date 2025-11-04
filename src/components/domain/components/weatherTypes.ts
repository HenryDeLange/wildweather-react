import type { GetWeatherApiArg } from '../../../redux/api/wildweatherApi';

export type WeatherFilterType = {
    type: WeatherFieldType;
    station: string | null;
    grouping: GroupingType;
    category: CategoryFilterType;
    aggregate: AggregateType;
    month: string | null;
    year: string | null;
}

export type WeatherFieldType = NonNullable<GetWeatherApiArg['weatherFields']>[number];

export type GroupingType = NonNullable<GetWeatherApiArg['grouping']>;

export type AggregateType = NonNullable<GetWeatherApiArg['aggregate']>;

export type CategoryFilterType = CategoryType | 'ALL';

export type CategoryType = NonNullable<GetWeatherApiArg['category']>;

export type CategoryValueType = {
    [K in CategoryType]: number;
}

export type FieldPropertyType = 'tmp' | 'wSp' | 'wMx' | 'wDr' | 'rRt' | 'rDy' | 'prs' | 'hmd' | 'uvI' | 'mis';

export type GroupedFieldType = {
    [K in FieldPropertyType]: CategoryValueType;
}
