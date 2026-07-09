import { useState } from "react";
import SearchBox from "./components/SearchBox";
import ScoreCard from "./components/ScoreCard";
import StockInfo from "./components/StockInfo";
import SummaryCard from "./components/SummaryCard";
import SwotCard from "./components/SwotCard";
import Loading from "./components/Loading";
import CompanyProfile from "./components/CompanyProfile";
import api from "./services/api";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeCompany = async (company) => {
    try {
      setLoading(true);
      setResult(null);
      setError("");

      const response = await api.post("/analyze", {
        company,
      });

      setResult(response.data.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while analyzing the company."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-5">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center">

          <h1 className="text-5xl font-bold text-slate-800">
            InvestIQ AI
          </h1>

          <p className="mt-3 text-xl text-gray-600">
            Live Financial Intelligence Powered by AI
          </p>

          <p className="mt-2 text-gray-500">
            Real-time Stock Data • Latest News • AI Investment Recommendations
          </p>

        </div>

        {/* Search */}
        <SearchBox
          onAnalyze={analyzeCompany}
          loading={loading}
        />

        {/* Loading */}
        {loading && <Loading />}

        {/* Error Card */}
        {error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 shadow-lg">

            <h2 className="text-2xl font-bold text-red-700">
              Company Not Supported
            </h2>

            <p className="mt-3 text-red-600">
              {error}
            </p>

            <div className="mt-6">

              <p className="font-semibold text-slate-700">
                Try searching:
              </p>

              <div className="mt-3 flex flex-wrap gap-3">

                {[
                  "Apple",
                  "Tesla",
                  "Microsoft",
                  "Amazon",
                  "Nvidia",
                  "Meta",
                  "Netflix",
                  "Google",
                ].map((company) => (
                  <span
                    key={company}
                    className="rounded-full bg-white px-4 py-2 shadow"
                  >
                    {company}
                  </span>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Results */}
        {result && (
          <>

            <CompanyProfile
              company={result.company}
              industry={result.industry}
              profile={result.companyProfile}
            />

            {/* Score Cards */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              <ScoreCard
                title="Financial Health"
                value={`${result.financialHealth}/100`}
                color="text-blue-600"
              />

              <ScoreCard
                title="Recommendation"
                value={result.recommendation}
                color={
                  result.recommendation === "INVEST"
                    ? "text-green-600"
                    : result.recommendation === "WATCH"
                    ? "text-amber-500"
                    : "text-red-600"
                }
              />

              <ScoreCard
                title="Confidence"
                value={`${result.confidence}%`}
                color="text-purple-600"
              />

              <ScoreCard
                title="Risk Level"
                value={result.riskLevel}
                color={
                  result.riskLevel === "Low"
                    ? "text-green-600"
                    : result.riskLevel === "Medium"
                    ? "text-amber-500"
                    : "text-red-600"
                }
              />

            </div>

            {/* Stock Information */}
            <StockInfo stock={result.stock} />

            {/* AI Summary */}
            <SummaryCard summary={result.quickSummary} />

            {/* SWOT */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <SwotCard
                title="Strengths"
                items={result.strengths}
              />

              <SwotCard
                title="Weaknesses"
                items={result.weaknesses}
              />

              <SwotCard
                title="Opportunities"
                items={result.opportunities}
              />

              <SwotCard
                title="Threats"
                items={result.threats}
              />

            </div>

            {/* Footer */}
            <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">

              <h3 className="text-center text-xl font-bold">
                Powered By
              </h3>

              <div className="mt-6 flex flex-wrap justify-center gap-3">

                <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
                  React
                </span>

                <span className="rounded-full bg-gray-200 px-4 py-2 text-gray-700">
                  Node.js
                </span>

                <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-700">
                  LangChain
                </span>

                <span className="rounded-full bg-purple-100 px-4 py-2 text-purple-700">
                  Gemini 2.5 Flash
                </span>

                <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                  Finnhub API
                </span>

                <span className="rounded-full bg-pink-100 px-4 py-2 text-pink-700">
                  Tavily Search
                </span>

              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                This application is for educational purposes only and
                should not be considered financial advice.
              </p>

            </div>

          </>
        )}

      </div>
    </div>
  );
}

export default App;