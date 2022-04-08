import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginReuest } from "../context/types/LoginRequest";
import { getRTKHeaders } from "./ApiUtils";
import AxiosBaseQuery, { AxiosBaseQueryArgsType } from "./AxiosBaseQuery";
import { IDENTITY_SERVICE_BASE_URL } from "./Constants";

// Define a service using a base URL and expected endpoints
export const IdentityServiceApi = createApi({
  reducerPath: "IdentityServiceApi",
  baseQuery: AxiosBaseQuery({
    baseUrl: IDENTITY_SERVICE_BASE_URL,
    prepareHeaders: (headers: any) => getRTKHeaders(headers),
    // mode: "cors",
  }),
  endpoints: (builder) => {
    return {
      Login: builder.query<any, LoginReuest>({
        query: (request): AxiosBaseQueryArgsType => ({
          url: `/api/token/`,
          method: "POST",
          data: request,
        }),
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginQuery, useLazyLoginQuery } = IdentityServiceApi;
