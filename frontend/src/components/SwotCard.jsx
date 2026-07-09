function SwotCard({ title, items }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-200">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-lg bg-gray-100 p-3 text-gray-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SwotCard;