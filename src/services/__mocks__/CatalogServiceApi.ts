import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const CatalogServiceApi = createApi({
  reducerPath: "CatalogServiceApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    GetCatalogByName: builder.query<any, string>({
      queryFn: (name) => {
        let result = {
          title: "to do",
        };

        return { data: result };
      },
    }),
  }),
});

export const { useGetCatalogByNameQuery, useLazyGetCatalogByNameQuery } =
  CatalogServiceApi;
