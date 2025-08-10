import { render, screen } from "@testing-library/react";
import Header from '../Header';

test("renders Header with correct title", () => {
  render(<Header />);
  // AppBar usually has role="banner" in MUI, so we can check that
  const banner = screen.getByRole("banner");
  expect(banner).toBeInTheDocument();

  // Check for your header text
  expect(screen.getByText("Nimo Industries Crypto Dashboard")).toBeInTheDocument();
});