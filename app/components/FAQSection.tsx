import { HelpCircle } from "lucide-react";

type FAQ = {
  question: string;
  answer:
    | string
    | string[]
    | {
        headers: string[];
        rows: string[][];
      };
};

type FAQSectionProps = {
  faq: FAQ[];
  heading?: string;
  subheading?: string;
};

export default function FAQSection({
  faq,
  heading = "Frequently Asked Questions",
  subheading = "Tap to view answers",
}: FAQSectionProps) {
  if (!faq?.length) return null;

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900">{heading}</h2>
        </div>
        <p className="text-sm text-gray-500">{subheading}</p>
      </div>

      <div className="space-y-4">
        {faq.map((item, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            <summary className="cursor-pointer list-none px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl flex justify-between items-center">
              <h4 className="text-indigo-600 text-lg font-semibold text-left">
                {item.question}
              </h4>

              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                </svg>
              </span>
            </summary>

            <div className="px-5 pb-5 pt-3 bg-gradient-to-r from-white to-indigo-50">
              {renderAnswer(item.answer)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function renderAnswer(
  answer:
    | string
    | string[]
    | { headers: string[]; rows: string[][] }
) {
  // 1️⃣ string
  if (typeof answer === "string") {
    return <p className="text-gray-700 leading-relaxed">{answer}</p>;
  }

  // 2️⃣ string[]
  if (Array.isArray(answer)) {
    return (
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        {answer.map((ans, i) => (
          <li key={i}>{ans}</li>
        ))}
      </ul>
    );
  }

  // 3️⃣ table
  if ("headers" in answer && "rows" in answer) {
    return (
      <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
        <table className="min-w-full text-gray-800">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <tr>
              {answer.headers.map((header, i) => (
                <th
                  key={i}
                  className="px-5 py-3 text-left font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {answer.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0 ? "bg-white" : "bg-indigo-50/20"
                }
              >
                {row.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-5 py-3 border-b border-gray-100"
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}