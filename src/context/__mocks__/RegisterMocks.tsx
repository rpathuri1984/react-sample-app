import MockAdapter from "axios-mock-adapter";
import { apiClient } from "../../services/ApiUtils";

export const RegisterMocks = () => {
  console.info("mocks registerd", apiClient);
  const mockedClient = new MockAdapter(apiClient);
  mockedClient.onGet(/127.0.0.1:8000/i).reply(200, {
    access:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhdmkiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTcxNjIzOTAyMiwiZW1haWwiOiJycGF0aHVyaUBnbWFpbC5jb20ifQ.6QbUtZHfb8mxpokKDg1B5DK60kuAjc4Lo-xGr53honU",
    refresh: "1234",
  });
  mockedClient.onPost(/validatetoken/i).reply(200, true);
};
