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
        <span className="text-3xl drop-shadow-sm" aria-hidden="true">
          ⚖️
        </span>
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
                  className={`px-5 py-4 text-left text-sm font-semibold text-indigo-700 border-b border-indigo-100 ${
                    idx === 0
                      ? "sticky left-0 bg-indigo-50 z-20 shadow-[1px_0_0_0_#e0e7ff]"
                      : "min-w-[150px]"
                  }`}
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
                className="hover:bg-indigo-50/40 transition-colors duration-200 group"
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-5 py-4 text-gray-800 text-sm border-b border-gray-100 ${
                      cIdx === 0
                        ? "sticky left-0 bg-white group-hover:bg-indigo-50/40 z-10 shadow-[1px_0_0_0_#f3f4f6]"
                        : ""
                    }`}
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
