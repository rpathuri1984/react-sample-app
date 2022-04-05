import MockAdapter from "axios-mock-adapter";
import { ENABLE_MOCK } from "../common/constants";
import { RegisterAppContextMocks } from "../context/__mocks__/";
import { apiClient } from "../services/ApiUtils";

const RegisterAppMocks = () => {
  if (!ENABLE_MOCK) {
    return;
  }

  const mockedClient = new MockAdapter(apiClient);
  RegisterAppContextMocks(mockedClient);
};

export default RegisterAppMocks;
