import React from "react";
import { Provider } from "react-redux";
import { screen } from "@testing-library/react";
import { store } from "./app/store";
import App from "./App";
import { mockApi, render } from "./test-utils";
import { GetRequest, PostRequest } from "./services/ApiUtils";

describe("Api Utility Test Suite", () => {
  beforeAll(() => {});
  afterAll(() => {
    mockApi.reset();
  });

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

  it("should GET data from mocked api", async () => {
    mockApi.onGet(/todos/).reply(200, { data: "get test success" });

    const response = await GetRequest({
      url: "https://jsonplaceholder.typicode.com/todos",
    });

    console.log(response.data);
  });

  it("should POST data from mocked api", async () => {
    mockApi.onPost(/posts/).reply(200, { data: "post test success" });

    const re2 = await PostRequest({
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
    console.log(re2.data);
  });
});
