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
      triggerApiProcessing: build.mutation<
        TriggerApiProcessingApiResponse,
        TriggerApiProcessingApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/admin/process/api`,
          method: "POST",
          params: {
            processAllAvailable: queryArg.processAllAvailable,
          },
        }),
        invalidatesTags: ["Admin"],
      }),
      getWeather: build.query<GetWeatherApiResponse, GetWeatherApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/weather`,
          params: {
            station: queryArg.station,
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
      getWeatherStatus: build.query<
        GetWeatherStatusApiResponse,
        GetWeatherStatusApiArg
      >({
        query: () => ({ url: `/api/v1/weather/status` }),
        providesTags: ["Weather"],
      }),
      getWeatherStations: build.query<
        GetWeatherStationsApiResponse,
        GetWeatherStationsApiArg
      >({
        query: () => ({ url: `/api/v1/weather/stations` }),
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
export type TriggerCsvProcessingApiResponse = unknown;
export type TriggerCsvProcessingApiArg = {
  forceFullReload?: boolean;
};
export type TriggerApiProcessingApiResponse = unknown;
export type TriggerApiProcessingApiArg = {
  processAllAvailable?: boolean;
};
export type GetWeatherApiResponse = /** status 200 OK */ WeatherDataDto;
export type GetWeatherApiArg = {
  station?: string;
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
export type GetWeatherStatusApiResponse =
  /** status 200 OK */ WeatherStatusDto[];
export type GetWeatherStatusApiArg = void;
export type GetWeatherStationsApiResponse = /** status 200 OK */ string[];
export type GetWeatherStationsApiArg = void;
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
export type WeatherStatusDto = {
  station: string;
  lastProcessedOn: string;
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
  useTriggerCsvProcessingMutation,
  useTriggerApiProcessingMutation,
  useGetWeatherQuery,
  useGetWeatherStatusQuery,
  useGetWeatherStationsQuery,
  useGetServerVersionQuery,
} = injectedRtkApi;
