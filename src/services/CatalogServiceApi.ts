import { createApi } from "@reduxjs/toolkit/query/react";
import { getRTKHeaders } from "./ApiUtils";
import AxiosBaseQuery, { AxiosBaseQueryArgsType } from "./AxiosBaseQuery";
import { CATALOG_SERVICE_BASE_URL } from "./Constants";

// Define a service using a base URL and expected endpoints
export const CatalogServiceApi = createApi({
  reducerPath: "CatalogServiceApi",
  baseQuery: AxiosBaseQuery({
    baseUrl: CATALOG_SERVICE_BASE_URL,
    prepareHeaders: (headers: any) => getRTKHeaders(headers),
    // mode: "cors",
  }),
  endpoints: (builder) => {
    return {
      GetCatalogByName: builder.query<any, string>({
        query: (name): AxiosBaseQueryArgsType => ({
          url: `/posts/${name}`,
          method: "GET",
        }),
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCatalogByNameQuery, useLazyGetCatalogByNameQuery } =
  CatalogServiceApi;
