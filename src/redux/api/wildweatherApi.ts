import { wildweatherBaseApi as api } from "./wildweatherBaseApi";
export const addTagTypes = [
  "Users",
  "Admin",
  "Weather",
  "Application Information",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getUser: build.query<GetUserApiResponse, GetUserApiArg>({
        query: (queryArg) => ({ url: `/api/v1/users/${queryArg.userId}` }),
        providesTags: ["Users"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.userId}`,
          method: "PUT",
          body: queryArg.userUpdate,
        }),
        invalidatesTags: ["Users"],
      }),
      registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/users/register`,
            method: "POST",
            body: queryArg.userRegister,
          }),
          invalidatesTags: ["Users"],
        },
      ),
      refreshUser: build.mutation<RefreshUserApiResponse, RefreshUserApiArg>({
        query: () => ({ url: `/api/v1/users/refresh`, method: "POST" }),
        invalidatesTags: ["Users"],
      }),
      loginUser: build.mutation<LoginUserApiResponse, LoginUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/login`,
          method: "POST",
          body: queryArg.userLogin,
        }),
        invalidatesTags: ["Users"],
      }),
      getCsvProcessStatus: build.query<
        GetCsvProcessStatusApiResponse,
        GetCsvProcessStatusApiArg
      >({
        query: () => ({ url: `/api/v1/admin/process/csv` }),
        providesTags: ["Admin"],
      }),
      triggerCsvProcessing: build.mutation<
        TriggerCsvProcessingApiResponse,
        TriggerCsvProcessingApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/admin/process/csv`,
          method: "POST",
          params: {
            forceFullReload: queryArg.forceFullReload,
          },
        }),
        invalidatesTags: ["Admin"],
      }),
      getWeatherUndergroundApiProcessStatus: build.query<
        GetWeatherUndergroundApiProcessStatusApiResponse,
        GetWeatherUndergroundApiProcessStatusApiArg
      >({
        query: () => ({ url: `/api/v1/admin/process/api/weather-underground` }),
        providesTags: ["Admin"],
      }),
      triggerWeatherUndergroundApiProcessing: build.mutation<
        TriggerWeatherUndergroundApiProcessingApiResponse,
        TriggerWeatherUndergroundApiProcessingApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/admin/process/api/weather-underground`,
          method: "POST",
          params: {
            fetchAllData: queryArg.fetchAllData,
          },
        }),
        invalidatesTags: ["Admin"],
      }),
      getAmbientWeatherApiProcessStatus: build.query<
        GetAmbientWeatherApiProcessStatusApiResponse,
        GetAmbientWeatherApiProcessStatusApiArg
      >({
        query: () => ({ url: `/api/v1/admin/process/api/ambient-weather` }),
        providesTags: ["Admin"],
      }),
      triggerAmbientWeatherApiProcessing: build.mutation<
        TriggerAmbientWeatherApiProcessingApiResponse,
        TriggerAmbientWeatherApiProcessingApiArg
      >({
        query: () => ({
          url: `/api/v1/admin/process/api/ambient-weather`,
          method: "POST",
        }),
        invalidatesTags: ["Admin"],
      }),
      getWeather: build.query<GetWeatherApiResponse, GetWeatherApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/weather`,
          params: {
            stations: queryArg.stations,
            grouping: queryArg.grouping,
            category: queryArg.category,
            aggregate: queryArg.aggregate,
            weatherFields: queryArg.weatherFields,
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
            startMonth: queryArg.startMonth,
            endMonth: queryArg.endMonth,
          },
        }),
        providesTags: ["Weather"],
      }),
      getWeatherStations: build.query<
        GetWeatherStationsApiResponse,
        GetWeatherStationsApiArg
      >({
        query: () => ({ url: `/api/v1/weather/stations` }),
        providesTags: ["Weather"],
      }),
      getWeatherStatus: build.query<
        GetWeatherStatusApiResponse,
        GetWeatherStatusApiArg
      >({
        query: () => ({ url: `/api/v1/weather/stations/details` }),
        providesTags: ["Weather"],
      }),
      getServerVersion: build.query<
        GetServerVersionApiResponse,
        GetServerVersionApiArg
      >({
        query: () => ({ url: `/api/v1/version/server` }),
        providesTags: ["Application Information"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as wildweatherApi };
export type GetUserApiResponse = /** status 200 OK */ UserInfo;
export type GetUserApiArg = {
  userId: number;
};
export type UpdateUserApiResponse = unknown;
export type UpdateUserApiArg = {
  userId: number;
  userUpdate: UserUpdate;
};
export type RegisterUserApiResponse = /** status 200 OK */ Tokens;
export type RegisterUserApiArg = {
  userRegister: UserRegister;
};
export type RefreshUserApiResponse = /** status 200 OK */ Tokens;
export type RefreshUserApiArg = void;
export type LoginUserApiResponse = /** status 200 OK */ Tokens;
export type LoginUserApiArg = {
  userLogin: UserLogin;
};
export type GetCsvProcessStatusApiResponse = /** status 200 OK */ CsvStatus;
export type GetCsvProcessStatusApiArg = void;
export type TriggerCsvProcessingApiResponse = unknown;
export type TriggerCsvProcessingApiArg = {
  forceFullReload?: boolean;
};
export type GetWeatherUndergroundApiProcessStatusApiResponse =
  /** status 200 OK */ ApiStatus;
export type GetWeatherUndergroundApiProcessStatusApiArg = void;
export type TriggerWeatherUndergroundApiProcessingApiResponse = unknown;
export type TriggerWeatherUndergroundApiProcessingApiArg = {
  fetchAllData?: boolean;
};
export type GetAmbientWeatherApiProcessStatusApiResponse =
  /** status 200 OK */ ApiStatus;
export type GetAmbientWeatherApiProcessStatusApiArg = void;
export type TriggerAmbientWeatherApiProcessingApiResponse = unknown;
export type TriggerAmbientWeatherApiProcessingApiArg = void;
export type GetWeatherApiResponse = /** status 200 OK */ WeatherDataDto;
export type GetWeatherApiArg = {
  stations?: string[];
  grouping?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  category?: "L" | "A" | "H";
  aggregate?: "AVERAGE" | "TOTAL";
  weatherFields?: (
    | "TEMPERATURE"
    | "WIND_SPEED"
    | "WIND_MAX"
    | "WIND_DIRECTION"
    | "RAIN_RATE"
    | "RAIN_DAILY"
    | "PRESSURE"
    | "HUMIDITY"
    | "UV_RADIATION_INDEX"
    | "MISSING"
  )[];
  startDate?: string;
  endDate?: string;
  startMonth?: number;
  endMonth?: number;
};
export type GetWeatherStationsApiResponse = /** status 200 OK */ string[];
export type GetWeatherStationsApiArg = void;
export type GetWeatherStatusApiResponse =
  /** status 200 OK */ WeatherStationDto[];
export type GetWeatherStatusApiArg = void;
export type GetServerVersionApiResponse = /** status 200 OK */ AppVersion;
export type GetServerVersionApiArg = void;
export type UserInfo = {
  description?: string;
  username: string;
  id: number;
};
export type UserUpdate = {
  description?: string;
};
export type Tokens = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};
export type UserRegister = {
  description?: string;
  username: string;
  password: string;
};
export type UserLogin = {
  username: string;
  password: string;
};
export type CsvStatus = {
  busy: boolean;
};
export type ApiStatus = {
  busy: boolean;
};
export type WeatherDataDto = {
  weather: {
    [key: string]: {
      [key: string]: {
        [key: string]: {
          [key: string]: {
            [key: string]: number;
          };
        };
      };
    };
  };
};
export type WeatherStationDto = {
  station: string;
  startDate: string;
  endDate: string;
  myStation?: boolean;
};
export type AppVersion = {
  appVersion: string;
  branch: string;
  commitId: string;
  commitTime: string;
  buildTime: string;
};
export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useRegisterUserMutation,
  useRefreshUserMutation,
  useLoginUserMutation,
  useGetCsvProcessStatusQuery,
  useTriggerCsvProcessingMutation,
  useGetWeatherUndergroundApiProcessStatusQuery,
  useTriggerWeatherUndergroundApiProcessingMutation,
  useGetAmbientWeatherApiProcessStatusQuery,
  useTriggerAmbientWeatherApiProcessingMutation,
  useGetWeatherQuery,
  useGetWeatherStationsQuery,
  useGetWeatherStatusQuery,
  useGetServerVersionQuery,
} = injectedRtkApi;
