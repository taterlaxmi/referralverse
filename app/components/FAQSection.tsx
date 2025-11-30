"use client";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";

type FAQ = {
  question: string;
  answer: string
  | string[]
  | {
    headers: string[];  // column headers
    rows: string[][];   // array of rows
  }
};

type FAQSectionProps = {
  faq: FAQ[];
  /** Allow more than one item to be open at once */
  allowMultipleOpen?: boolean;
  heading?: string;
  subheading?: string;
};

function useOpenState(allowMultiple: boolean) {
  const [open, setOpen] = useState<number[] | null>(null);

  const isOpen = useCallback(
    (index: number) => Array.isArray(open) && open.includes(index),
    [open]
  );

  const toggle = useCallback(
    (index: number) =>
      setOpen((prev) => {
        if (!allowMultiple) {
          return prev && prev[0] === index ? null : [index];
        }
        const arr = Array.isArray(prev) ? [...prev] : [];
        const i = arr.indexOf(index);
        if (i >= 0) {
          arr.splice(i, 1);
          return arr.length ? arr : null;
        }
        arr.push(index);
        return arr;
      }),
    [allowMultiple]
  );

  return { isOpen, toggle };
}

function FAQItem({
  id,
  index,
  item,
  open,
  onToggle,
}: {
  id: string;
  index: number;
  item: FAQ;
  open: boolean;
  onToggle: (i: number) => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentId = `${id}-content-${index}`;
  const buttonId = `${id}-button-${index}`;
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // measure and set max-height for smooth transition
    setMaxHeight(open ? `${el.scrollHeight}px` : "0px");
  }, [open, item.answer]);

  useEffect(() => {
    const handleResize = () => {
      const el = contentRef.current;
      if (!el) return;
      if (open) setMaxHeight(`${el.scrollHeight}px`);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(index);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <button
        id={buttonId}
        aria-controls={contentId}
        aria-expanded={open}
        onClick={() => onToggle(index)}
        onKeyDown={onKeyDown}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl"
      >
        <h4 className="text-indigo-600 text-lg font-semibold text-left">{item.question}</h4>

        <span
          aria-hidden
          className={`ml-3 transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        >
          <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
          </svg>
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        ref={contentRef}
        style={{ maxHeight, transition: "max-height 300ms ease", overflow: "hidden" }}
        className="px-5 pb-0 bg-gradient-to-r from-white to-indigo-50 opacity-100"
        aria-hidden={!open}
      >
        <div className="pt-3 pb-5">
          {(() => {
            // 1️⃣ Case: answer is a string
            if (typeof item.answer === "string") {
              return (
                <p className="text-gray-700 leading-relaxed mt-1">
                  {item.answer}
                </p>
              );
            }

            // 2️⃣ Case: answer is an array of strings (bullets)
            if (Array.isArray(item.answer)) {
              return (
                <ul className="mt-1 list-disc pl-5 text-gray-700 space-y-1">
                  {item.answer.map((ans, i) => (
                    <li key={i}>{ans}</li>
                  ))}
                </ul>
              );
            }

            // 3️⃣ Case: answer is a table { headers, rows }
            if ("headers" in item.answer && "rows" in item.answer) {
              return (
                <div className=" overflow-x-auto bg-white       border border-gray-100       rounded-2xl       shadow-sm       hover:shadow-md       transition-all duration-300">
                  <table className="min-w-full text-gray-800">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                      <tr>
                        {item.answer.headers.map((header, index) => (
                          <th
                            key={index}
                            className="px-5 py-3 text-left font-semibold text-gray-900"                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.answer.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-indigo-50/20"}                 transition-all duration-300 `} >
                          {row.map((col, colIndex) => (
                            <td key={colIndex} className="px-5 py-3 border-b border-gray-100 text-[1.02rem]" >
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
          })()}

        </div>
      </div>
    </div>
  );
}

export default function FAQSection({
  faq,
  allowMultipleOpen = false,
  heading = "Frequently Asked Questions",
  subheading = "Tap to view answers",
}: FAQSectionProps) {
  const id = useId();
  const { isOpen, toggle } = useOpenState(allowMultipleOpen);

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
          <FAQItem
            key={`${id}-${idx}-${item.question.slice(0, 20)}`}
            id={id}
            index={idx}
            item={item}
            open={isOpen(idx)}
            onToggle={toggle}
          />
        ))}
      </div>
    </section>
  );
}