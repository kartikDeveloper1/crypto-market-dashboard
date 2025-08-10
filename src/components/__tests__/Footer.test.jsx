import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
  test("renders footer text and link", () => {
    render(<Footer />);
    
    // Check copyright text with current year
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Nimo Industries Pty Ltd.`))).toBeInTheDocument();
    
    // Check link text and href
    const link = screen.getByRole("link", { name: /nimoindustries\.com/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://nimoindustries.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
