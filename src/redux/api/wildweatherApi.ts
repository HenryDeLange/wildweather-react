import { wildweatherBaseApi as api } from "./wildweatherBaseApi";
export const addTagTypes = [
  "User Authentication",
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
        providesTags: ["User Authentication"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.userId}`,
          method: "PUT",
          body: queryArg.userUpdate,
        }),
        invalidatesTags: ["User Authentication"],
      }),
      registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/users/register`,
            method: "POST",
            body: queryArg.userRegister,
          }),
          invalidatesTags: ["User Authentication"],
        },
      ),
      refreshUser: build.mutation<RefreshUserApiResponse, RefreshUserApiArg>({
        query: () => ({ url: `/api/v1/users/refresh`, method: "POST" }),
        invalidatesTags: ["User Authentication"],
      }),
      loginUser: build.mutation<LoginUserApiResponse, LoginUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/login`,
          method: "POST",
          body: queryArg.userLogin,
        }),
        invalidatesTags: ["User Authentication"],
      }),
      triggerCsvProcessing: build.mutation<
        TriggerCsvProcessingApiResponse,
        TriggerCsvProcessingApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/admin/process-files`,
          method: "POST",
          params: {
            forceFullReload: queryArg.forceFullReload,
          },
        }),
        invalidatesTags: ["Admin"],
      }),
      getWeather: build.query<GetWeatherApiResponse, GetWeatherApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/weather`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
        providesTags: ["Weather"],
      }),
      getWeatherOnDay: build.query<
        GetWeatherOnDayApiResponse,
        GetWeatherOnDayApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/weather/${queryArg.date}` }),
        providesTags: ["Weather"],
      }),
      getWeatherOnDay1: build.query<
        GetWeatherOnDay1ApiResponse,
        GetWeatherOnDay1ApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/weather/${queryArg.date}/${queryArg.station}`,
        }),
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
export type GetWeatherApiResponse = /** status 200 OK */ WeatherDto[];
export type GetWeatherApiArg = {
  startDate?: string;
  endDate?: string;
};
export type GetWeatherOnDayApiResponse = /** status 200 OK */ WeatherDto[];
export type GetWeatherOnDayApiArg = {
  date: string;
};
export type GetWeatherOnDay1ApiResponse = /** status 200 OK */ WeatherDto[];
export type GetWeatherOnDay1ApiArg = {
  date: string;
  station: string;
};
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
export type WeatherDto = {
  station: string;
  date: string;
  category: "L" | "A" | "H";
  temperature: number;
  windSpeed: number;
  windMax: number;
  windDirection: string;
  rainRate: number;
  rainDaily: number;
  pressure: number;
  humidity: number;
  uvRadiationIndex: number;
  missing: number;
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
  useGetWeatherQuery,
  useGetWeatherOnDayQuery,
  useGetWeatherOnDay1Query,
  useGetServerVersionQuery,
} = injectedRtkApi;
