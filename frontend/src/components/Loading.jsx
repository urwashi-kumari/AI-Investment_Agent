function Loading() {
  return (
    <div className="mt-10 rounded-2xl bg-white p-10 shadow-lg text-center">

      <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        AI is analyzing the company...
      </h2>

      <div className="mt-6 space-y-3 text-gray-600">

        <p>Searching company information...</p>

        <p>Fetching live stock data...</p>

        <p>Collecting latest news...</p>

        <p>Searching the web...</p>

        <p>Generating AI investment report...</p>

      </div>

    </div>
  );
}

export default Loading;