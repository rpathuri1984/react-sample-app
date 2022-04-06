import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";

import { CLIENT_ID } from "./../common/constants";

const apiClient = axios.create();

export type RequestType = {
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
    ...headers,
  };
};

const MockApiClient = (): MockAdapter => {
  return new MockAdapter(apiClient);
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

const getRTKHeaders = (headers: any) => {
  const token = JSON.parse(localStorage.getItem("authTokens") || "{}").access;
  // If we have a token set in state, let's assume that we should be passing it.
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  headers.set("accept", "application/json");
  return headers;
};

export {
  PostRequest,
  GetRequest,
  PutRequest,
  DeleteRequest,
  apiClient,
  MockApiClient,
  getHeaders,
  getRTKHeaders,
};

export type { RequestType as PostRequestType };
