import MockAdapter from "axios-mock-adapter";
import { apiClient } from "../../services/ApiUtils";

export const RegisterAppContextMocks = (mockedApiClient: MockAdapter) => {
  const mockedClient = mockedApiClient || new MockAdapter(apiClient);
  mockedClient.onGet(/token/i).reply(200, {
    access:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhdmkiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTcxNjIzOTAyMiwiZW1haWwiOiJycGF0aHVyaUBnbWFpbC5jb20ifQ.6QbUtZHfb8mxpokKDg1B5DK60kuAjc4Lo-xGr53honU",
    refresh: "1234",
  });
  mockedClient.onPost(/validatetoken/i).reply(200, false);
};
