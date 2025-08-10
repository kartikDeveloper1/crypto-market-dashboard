import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner Component", () => {
  it("renders the loading spinner", () => {
    render(<LoadingSpinner />);

    // Check if CircularProgress is rendered (role="progressbar" comes from MUI)
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});