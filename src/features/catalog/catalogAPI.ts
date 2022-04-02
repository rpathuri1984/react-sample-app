import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../services/axiosBaseQuery";
import { BASE_URL } from "./Constants";
import { Pokemon } from "./types/Catalog";

// Define a service using a base URL and expected endpoints
export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => {
    return {
      GetCatalogByName: builder.query<Pokemon, string>({
        query: (name) => ({ url: `/pokemon/${name}` }),
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCatalogByNameQuery } = catalogAPI;
