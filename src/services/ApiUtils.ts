import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { CLIENT_ID } from "./../common/constants";

const apiClient = axios.create();

type RequestType = {
  url: string;
  body?: any;
  queryParams?: any;
  headers?: any;
};

const getCSRFTokenFromCookie = () => "fake token";

const getHeaders = (headers?: any) => {
  return {
    "X-CSRFTOKEN": getCSRFTokenFromCookie(),
    "X-ClientId": CLIENT_ID,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const PostRequest = async (request: RequestType) => {
  return await apiClient.post(request.url, request.body, {
    params: request.queryParams,
    headers: getHeaders(request.headers),
  });
};

const GetRequest = async (request: RequestType) => {
  return await apiClient.get(request.url, {
    data: request.body,
    params: request.queryParams,
    headers: getHeaders(request.headers),
  });
};

const PutRequest = async (request: RequestType) => {
  return await apiClient.put(request.url, {
    data: request.body,
    params: request.queryParams,
    headers: getHeaders(request.headers),
  });
};

const DeleteRequest = async (request: RequestType) => {
  return await apiClient.delete(request.url, {
    data: request.body,
    params: request.queryParams,
    headers: getHeaders(request.headers),
  });
};

const MockApiClient = (): MockAdapter => {
  return new MockAdapter(apiClient);
};

export {
  PostRequest,
  GetRequest,
  PutRequest,
  DeleteRequest,
  apiClient,
  MockApiClient,
};
export type { RequestType as PostRequestType };
