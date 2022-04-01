import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetRequest } from "../../services/ApiUtils";

// A mock function to mimic making an async request for data
export const fetchCount = async (amount = 1) => {
  // return new Promise<{ data: number }>((resolve) =>
  //   setTimeout(() => resolve({ data: amount }), 500)
  // );
  return await GetRequest({
    url: "https://jsonplaceholder.typicode.com/posts",
  });
};

// Define a service using a base URL and expected endpoints
export const counterAPI = createApi({
  reducerPath: "counterAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, string>({
      query: (name) => `posts/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useLazyGetPostsQuery } = counterAPI;
