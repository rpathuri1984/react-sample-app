import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { render } from "./../../test-utils";
import Catalog from "./Catalog";

// jest.mock("./catalogAPI");

const mockApi = new MockAdapter(axios);

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockApi.reset();
});

describe("feature/Catalog component", () => {
  it("should render", async () => {
    // arrange
    mockApi.onGet(/posts/i).reply(200, { title: "todo" });

    // act
    const { getByText } = render(<Catalog />);

    // assert
    await waitFor(() => expect(getByText(/get data/i)).toBeInTheDocument());
  });

  it("should get data from api on button click", async () => {
    // arrange
    mockApi.onGet(/posts/i).reply(200, { title: "todo" });
    const { getByText } = render(<Catalog />);
    const button = getByText(/get data/i);

    // act
    fireEvent.click(button);

    // assert
    await waitFor(() => expect(getByText(/todo/i)).toBeInTheDocument());
  });
});
