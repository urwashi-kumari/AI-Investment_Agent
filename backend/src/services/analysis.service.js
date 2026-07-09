import llm from "../config/langchain.js";
import { investmentPrompt } from "../prompts/investment.prompt.js";
import {
  searchSymbol,
  getCompanyProfile,
  getStockQuote,
  getCompanyNews,
} from "./stock.service.js";
import { searchCompany } from "./search.service.js";

export async function analyzeCompany(company) {
  // Automatically find stock symbol
  const symbol = await searchSymbol(company);

   let profile;
   let quote;
  let news;
//   console.log("Company:", company);
// console.log("Symbol:", symbol);

  // Fetch live financial data
  try {
    profile = await getCompanyProfile(symbol);
    quote = await getStockQuote(symbol);
    news = await getCompanyNews(symbol);
  // } catch (error) {
  //   throw new Error(
  //     `Live financial data for "${company}" is unavailable with the current API plan. Please try another publicly listed company such as Apple, Tesla, Microsoft, Amazon, Nvidia, or Netflix.`
  //   );
  // }
  } catch (error) {
  //console.log("Finnhub Error:");
  //console.log(error.response?.data || error.message);

  throw new Error(
    `Live financial data for "${company}" is unavailable with the current API plan. Please try another publicly listed company.`
  );
}

  // Fetch latest web search results
  const webSearch = await searchCompany(company);

  // Build prompt
  const prompt = await investmentPrompt.format({
    company,
    profile: JSON.stringify(profile, null, 2),
    quote: JSON.stringify(quote, null, 2),
    news: JSON.stringify(news, null, 2),
    webSearch: JSON.stringify(webSearch, null, 2),
  });

  // Ask Gemini
  const response = await llm.invoke(prompt);

  let text = response.content;

  if (Array.isArray(text)) {
    text = text.map((item) => item.text || "").join("");
  }

  // Clean markdown
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const analysis = JSON.parse(text);

  // Add live stock information
  analysis.stock = {
    currentPrice: quote.c,
    change: quote.d,
    percentChange: quote.dp,
    high: quote.h,
    low: quote.l,
    open: quote.o,
    previousClose: quote.pc,
  };

  // Add company profile
  analysis.companyProfile = {
    exchange: profile.exchange,
    ipo: profile.ipo,
    marketCap: profile.marketCapitalization,
    website: profile.weburl,
    logo: profile.logo,
  };

  return analysis;
}