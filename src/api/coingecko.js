import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getMarketData = (page = 1, perPage = 30) =>
  axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page,
      sparkline: false,
    },
  });

export const getCoinDetails = (id) =>
  axios.get(`${BASE_URL}/coins/${id}`);
