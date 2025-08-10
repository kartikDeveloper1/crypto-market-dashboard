import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import * as api from "../api/coingecko";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const coinsMock = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    current_price: 50000,
    market_cap: 900000000,
    price_change_percentage_24h: 2.5,
    image: "bitcoin.png",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    current_price: 4000,
    market_cap: 400000000,
    price_change_percentage_24h: -1.5,
    image: "ethereum.png",
  },
];

// Mock API success
vi.spyOn(api, "getMarketData").mockResolvedValue({ data: coinsMock });

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe("Home page", () => {
  test("renders coin list after fetch", async () => {
    renderHome();

    // Wait for Bitcoin and Ethereum to appear
    const bitcoin = await screen.findByText("Bitcoin");
    const ethereum = await screen.findByText("Ethereum");

    expect(bitcoin).toBeInTheDocument();
    expect(ethereum).toBeInTheDocument();
  });

  test("filters coins on search input", async () => {
    renderHome();

    // Wait for coins to load
    await screen.findByText("Bitcoin");

    // Type into search input to filter coins
    fireEvent.change(screen.getByPlaceholderText(/search coins/i), {
      target: { value: "eth" },
    });

    // Ethereum should be visible, Bitcoin should not
    expect(screen.queryByText("Bitcoin")).not.toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  test("navigates on row click", async () => {
    renderHome();

    await screen.findByText("Bitcoin");

    fireEvent.click(screen.getByText("Bitcoin").closest("tr"));

    expect(mockNavigate).toHaveBeenCalledWith("/coin/bitcoin");
  });
});
