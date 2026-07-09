import axios from "axios";

const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";

// Search company symbol
export async function searchSymbol(company) {
  const popularCompanies = {
    apple: "AAPL",
    microsoft: "MSFT",
    tesla: "TSLA",
    amazon: "AMZN",
    google: "GOOGL",
    alphabet: "GOOGL",
    meta: "META",
    facebook: "META",
    nvidia: "NVDA",
    netflix: "NFLX",
  };

  const name = company.trim().toLowerCase();

  // Use fixed mapping for popular companies
  if (popularCompanies[name]) {
    console.log("Using fixed symbol:", popularCompanies[name]);
    return popularCompanies[name];
  }

  // Otherwise search Finnhub
  const response = await axios.get(
    `${BASE_URL}/search?q=${encodeURIComponent(company)}&token=${API_KEY}`
  );

  const results = response.data.result;

  if (!results || results.length === 0) {
    throw new Error("Company not found");
  }

  // Prefer US exchanges first
  const preferred = results.find(
    (item) =>
      item.symbol &&
      (item.exchange === "NASDAQ" || item.exchange === "NYSE")
  );

  const symbol = preferred ? preferred.symbol : results[0].symbol;

  console.log("Search Symbol:", symbol);

  return symbol;
}

// Company Profile
export async function getCompanyProfile(symbol) {
  const response = await axios.get(
    `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`
  );

  return response.data;
}

// Live Quote
export async function getStockQuote(symbol) {
  const response = await axios.get(
    `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
  );

  return response.data;
}

// Latest News
export async function getCompanyNews(symbol) {
  const today = new Date();
  const from = new Date();

  from.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const response = await axios.get(
    `${BASE_URL}/company-news?symbol=${symbol}&from=${formatDate(from)}&to=${formatDate(today)}&token=${API_KEY}`
  );

  return response.data.slice(0, 5);
}