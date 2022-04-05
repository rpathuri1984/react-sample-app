import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Catalog } from "./../types/Catalog";

export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    GetCatalogByName: builder.query<Catalog, string>({
      queryFn: (name) => {
        let result: Catalog = {
          reason: "too cold",
        };

        return { data: result };
      },
    }),
  }),
});

export const { useGetCatalogByNameQuery, useLazyGetCatalogByNameQuery } =
  catalogAPI;
