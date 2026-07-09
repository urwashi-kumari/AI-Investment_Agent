function StockInfo({ stock }) {
  if (!stock) return null;

  const isPositive = stock.change >= 0;

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Current Price */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <p className="text-sm font-medium text-gray-500">
          Current Price
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-800">
          ${Number(stock.currentPrice).toFixed(2)}
        </h2>
      </div>

      {/* Today's Change */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <p className="text-sm font-medium text-gray-500">
          Today's Change
        </p>

        <h2
          className={`mt-2 text-3xl font-bold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {Number(stock.change).toFixed(2)}
        </h2>

        <p
          className={`mt-1 text-lg font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          ({isPositive ? "+" : ""}
          {Number(stock.percentChange).toFixed(2)}%)
        </p>
      </div>

      {/* Previous Close */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <p className="text-sm font-medium text-gray-500">
          Previous Close
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-800">
          ${Number(stock.previousClose).toFixed(2)}
        </h2>
      </div>

      {/* Day Range */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <p className="text-sm font-medium text-gray-500">
          Day Range
        </p>

        <h2 className="mt-2 text-xl font-bold text-slate-800">
          ${Number(stock.low).toFixed(2)} - $
          {Number(stock.high).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default StockInfo;