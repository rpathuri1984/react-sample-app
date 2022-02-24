import React from "react";
import { Provider } from "react-redux";
import { screen } from "@testing-library/react";
import { store } from "./app/store";
import App from "./App";
import { render } from "./test-utils";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByText(/learn chakra/i);
  expect(linkElement).toBeInTheDocument();

  expect(getByText(/Chakra/i)).toBeInTheDocument();
});
