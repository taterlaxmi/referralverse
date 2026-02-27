type ComparisonTable = {
  title: string;
  columns: string[];
  rows: string[][];
};

type Props = {
  data: ComparisonTable;
  brand?: string;
};

export default function ComparisonSection({ data, brand }: Props) {
  if (!data || data.rows.length === 0) return null;

  return (
    <section className="my-20">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900">
        <svg
          className="w-8 h-8 text-indigo-500 drop-shadow-sm"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-2a4 4 0 014-4h2m-6 6h6m4-6v6m-4-6h4"
          />
        </svg>
        {data.title || `How ${brand} compares with other fitness apps`}
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
              {data.columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-5 py-4 text-left text-sm font-semibold text-indigo-700 border-b border-indigo-100"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-indigo-50/40 transition-colors duration-200"
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-5 py-4 text-gray-800 text-sm border-b border-gray-100"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
