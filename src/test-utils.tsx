import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { MockApiClient } from "./services/ApiUtils";
import { AuthProvider } from "./context/AuthContext";
import { store } from "./app/store";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <Provider store={store}>
    <AuthProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </AuthProvider>
  </Provider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

const mockApi = MockApiClient();

export { customRender as render, mockApi };
