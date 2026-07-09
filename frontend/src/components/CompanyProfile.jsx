function formatMarketCap(value) {
  if (!value) return "N/A";

  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)} Trillion`;
  }

  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)} Billion`;
  }

  return `$${value.toFixed(2)} Million`;
}

function CompanyProfile({ company, industry, profile }) {
  if (!profile) return null;

  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
      <div className="flex flex-col items-center gap-8 md:flex-row">

        {profile.logo && (
          <img
            src={profile.logo}
            alt={company}
            className="h-24 w-24 rounded-xl border border-gray-200 object-contain p-2"
          />
        )}

        <div className="flex-1">

          <h2 className="text-4xl font-bold text-slate-800">
            {company}
          </h2>

          <p className="mt-2 text-lg text-gray-500">
            {industry}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div>
              <span className="font-semibold text-slate-700">
                Exchange:
              </span>{" "}
              {profile.exchange || "N/A"}
            </div>

            <div>
              <span className="font-semibold text-slate-700">
                IPO:
              </span>{" "}
              {profile.ipo || "N/A"}
            </div>

            <div>
              <span className="font-semibold text-slate-700">
                Market Cap:
              </span>{" "}
              {formatMarketCap(profile.marketCap)}
            </div>

            <div>
              <span className="font-semibold text-slate-700">
                Website:
              </span>{" "}

              {profile.website ? (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.website
                    .replace(/^https?:\/\//, "")
                    .replace(/\/$/, "")}
                </a>
              ) : (
                "N/A"
              )}
            </div>

          </div>

          <p className="mt-6 text-sm text-gray-500">
            Last Updated: {new Date().toLocaleString()}
          </p>

        </div>

      </div>
    </div>
  );
}

export default CompanyProfile;