import MockAdapter from "axios-mock-adapter";
import { RegisterCatalogMocks } from "../catalog/__mocks__";

export const RegisterFeatureMocks = (mockedApiClient: MockAdapter) => {
  RegisterCatalogMocks(mockedApiClient);
};
