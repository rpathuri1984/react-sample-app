import MockAdapter from "axios-mock-adapter";
import { apiClient } from "../../../services/ApiUtils";
import data from "./mockdata.json";

export const RegisterCatalogMocks = (mockedApiClient: MockAdapter) => {
  const mockedClient = mockedApiClient || new MockAdapter(apiClient);
  mockedClient.onGet(/pokemon/g).reply(200, data);
};
