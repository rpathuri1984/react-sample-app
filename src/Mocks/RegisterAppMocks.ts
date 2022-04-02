import MockAdapter from "axios-mock-adapter";
import { RegisterAppContextMocks } from "../context/__mocks__/";
import { RegisterFeatureMocks } from "../features/__mocks__";
import { apiClient } from "../services/ApiUtils";

const RegisterAppMocks = () => {
  if (!process.env.REACT_APP_MOCK) {
    return;
  }

  const mockedClient = new MockAdapter(apiClient);
  RegisterAppContextMocks(mockedClient);
  RegisterFeatureMocks(mockedClient);
};

export default RegisterAppMocks;
