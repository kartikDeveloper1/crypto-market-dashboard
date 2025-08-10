import { render, screen } from "@testing-library/react";
import ErrorAlert from "../ErrorAlert";

describe("ErrorAlert Component", () => {
  it("renders the error message", () => {
    const testMessage = "Something went wrong!";
    render(<ErrorAlert message={testMessage} />);

    // Check if the message appears
    expect(screen.getByText(testMessage)).toBeInTheDocument();

    // Check if the alert role is present
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
