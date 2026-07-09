import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export async function searchCompany(company) {
  const response = await tvly.search(
  `${company} latest stock news earnings financial analysis`,
  {
    searchDepth: "advanced",
    maxResults: 5,
    topic: "news",
  }
);

  return response.results;
}