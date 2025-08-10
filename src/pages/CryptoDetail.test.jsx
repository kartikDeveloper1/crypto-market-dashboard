import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CryptoDetail from "./CryptoDetail";
import * as api from "../api/coingecko";
import { vi } from "vitest";

// Mock useParams to return a specific coin id
vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "bitcoin" }),
}));

const coinMock = {
  name: "Bitcoin",
  symbol: "btc",
  image: { large: "bitcoin-large.png" },
  market_data: {
    current_price: { usd: 50000 },
    market_cap: { usd: 900000000 },
  },
  description: { en: "Bitcoin is a cryptocurrency. It is popular." },
  links: { homepage: ["https://bitcoin.org"] },
};

// Mock getCoinDetails API
vi.spyOn(api, "getCoinDetails").mockImplementation(() =>
  Promise.resolve({ data: coinMock })
);

describe("CryptoDetail", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading spinner initially", () => {
    // Render but don't wait for promises to resolve, so loading shows
    render(<CryptoDetail />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders coin details after fetch", async () => {
    render(<CryptoDetail />);

    // Wait for coin name to appear
    const heading = await screen.findByRole("heading", {
      name: /bitcoin \(btc\)/i,
    });
    expect(heading).toBeInTheDocument();

    // Image with alt text
    expect(screen.getByAltText("Bitcoin")).toHaveAttribute(
      "src",
      "bitcoin-large.png"
    );

    // Price and Market Cap text
    expect(screen.getByText(/price: \$50,000/i)).toBeInTheDocument();
    expect(screen.getByText(/market cap: \$900,000,000/i)).toBeInTheDocument();

    // Description (only first sentence)
    expect(
      screen.getByText("Bitcoin is a cryptocurrency.", { exact: false })
    ).toBeInTheDocument();

    // Official Website link
    const link = screen.getByRole("link", { name: /official website/i });
    expect(link).toHaveAttribute("href", "https://bitcoin.org");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  test("renders error message on API failure", async () => {
    // Override mock to reject
    api.getCoinDetails.mockImplementationOnce(() =>
      Promise.reject(new Error("API error"))
    );

    render(<CryptoDetail />);

    const errorAlert = await screen.findByText(/failed to fetch coin details/i);
    expect(errorAlert).toBeInTheDocument();
  });
});
