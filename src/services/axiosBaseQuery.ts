import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import { GetRequest, RequestType } from "./ApiUtils";

export type axiosBaseQueryType = { baseUrl: string };
export type axiosBaseQueryArgsType = {
  url: string;
  body?: AxiosRequestConfig["data"];
  headers?: any;
};

const axiosBaseQuery =
  (
    { baseUrl }: axiosBaseQueryType = { baseUrl: "" }
  ): BaseQueryFn<axiosBaseQueryArgsType, unknown, unknown> =>
  async ({ url, body, headers }) => {
    let request: RequestType = {
      url: `${baseUrl}${url}`,
      body,
      headers,
    };

    try {
      const result = await GetRequest(request);
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default axiosBaseQuery;
