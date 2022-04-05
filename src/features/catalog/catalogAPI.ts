import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRTKHeaders } from "../../services/ApiUtils";
import { BASE_URL } from "./Constants";
import { Catalog } from "./types/Catalog";

// Define a service using a base URL and expected endpoints
export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => getRTKHeaders(headers),
    mode: "cors",
  }),
  endpoints: (builder) => {
    return {
      GetCatalogByName: builder.query<Catalog, string>({
        query: (name) => ({ url: `/pokemon/${name}` }),
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCatalogByNameQuery, useLazyGetCatalogByNameQuery } =
  catalogAPI;
