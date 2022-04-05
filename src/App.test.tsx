import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { mockApi, render } from "./test-utils";
import { GetRequest, PostRequest } from "./services/ApiUtils";

describe("Api Utility Test Suite", () => {
  beforeAll(() => {});
  afterAll(() => {
    mockApi.reset();
  });

  test.skip("renders learn react link", () => {
    const { getByText } = render(<App />);

    const linkElement = screen.getByText(/learn chakra/i);
    expect(linkElement).toBeInTheDocument();

    expect(getByText(/Chakra/i)).toBeInTheDocument();
  });

  it("should GET data from mocked api", async () => {
    // arrange
    mockApi.onGet(/todos/).reply(200, { data: "get test success" });

    // act
    const response = await GetRequest({
      url: "https://jsonplaceholder.typicode.com/todos",
    });

    // assert
    expect(response.data.data).toEqual("get test success");
  });

  it("should POST data from mocked api", async () => {
    // arrange
    mockApi.onPost(/posts/).reply(200, { data: "post test success" });

    // act
    const re2 = await PostRequest({
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });

    // assert
    expect(re2.data.data).toEqual("post test success");
  });
});
