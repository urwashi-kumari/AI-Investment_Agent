import { useState } from "react";

function SearchBox({ onAnalyze, loading }) {
  const [company, setCompany] = useState("");

  const handleSubmit = () => {
    if (!company.trim()) return;
    onAnalyze(company);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-5">

      <div className="relative w-full max-w-2xl">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search any public company (Apple, Tesla, Microsoft, Reliance...)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl border border-gray-300 py-4 pl-12 pr-5 text-lg shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Analyze Company"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Search any publicly listed company to receive an AI-powered investment analysis
        based on live financial data, recent news, and web search results.
      </p>

    </div>
  );
}

export default SearchBox;