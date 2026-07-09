function SummaryCard({ summary }) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-md border border-gray-200">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Quick Summary
      </h2>

      <p className="leading-8 text-gray-600">
        {summary}
      </p>
    </div>
  );
}

export default SummaryCard;