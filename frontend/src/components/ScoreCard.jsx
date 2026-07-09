function ScoreCard({ title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-200 hover:shadow-xl transition duration-300">
      <h3 className="text-sm font-semibold uppercase text-gray-500">
        {title}
      </h3>

      <h2 className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default ScoreCard;