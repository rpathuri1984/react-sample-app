import { createApi } from "@reduxjs/toolkit/query/react";
import { getRTKHeaders } from "../../services/ApiUtils";
import axiosBaseQuery, {
  axiosBaseQueryArgsType,
} from "../../services/axiosBaseQuery";
import { BASE_URL } from "./Constants";

// Define a service using a base URL and expected endpoints
export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers: any) => getRTKHeaders(headers),
    // mode: "cors",
  }),
  endpoints: (builder) => {
    return {
      GetCatalogByName: builder.query<any, string>({
        query: (name): axiosBaseQueryArgsType => ({
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
  catalogAPI;
