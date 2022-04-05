import { fireEvent } from "@testing-library/react";

import { render } from "./../../test-utils";
import Catalog from "./Catalog";

jest.mock("./catalogAPI");

describe("feature/Catalog component", () => {
  it("should render", () => {
    // arrange

    // act
    const { getByText } = render(<Catalog />);

    // assert
    expect(getByText(/Loading...!/i)).toBeInTheDocument();
  });

  it("should get data from api on button click", async () => {
    // arrange
    const { getByText } = render(<Catalog />);
    const button = getByText(/get data/i);

    // act
    await fireEvent.click(button);

    // assert
    expect(getByText(/too cold/i)).toBeInTheDocument();
  });
});
