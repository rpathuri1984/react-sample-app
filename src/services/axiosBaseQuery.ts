import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export type axiosBaseQueryType = {
  baseUrl: string;
  prepareHeaders?: Function;
};

export type axiosBaseQueryArgsType = {
  url: string;
  method: AxiosRequestConfig["method"];
  params?: AxiosRequestConfig["params"];
  data?: AxiosRequestConfig["data"];
};

const axiosBaseQuery =
  (
    { baseUrl }: axiosBaseQueryType = { baseUrl: "/" }
  ): BaseQueryFn<axiosBaseQueryArgsType, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: `${baseUrl}${url}`,
        method,
        params,
        data,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default axiosBaseQuery;
