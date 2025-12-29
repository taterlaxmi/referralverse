import React from "react";

type Benefit = {
    title?: string;
    description?: string;
    emoji?: string;
    icon?: string; // optional icon URL
};

type Props = {
    benefits?: Benefit[];
    brand?: string;
};

export default function BenefitsSection({ benefits = [], brand }: Props) {
    if (!benefits.length) return null;

    return (
        <section className="my-20">
            {/* Section Heading */}
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900">
                <span className="w-10 h-10 flex items-center justify-center rounded-full
                   bg-gradient-to-br from-indigo-600 to-purple-600
                   text-white shadow-md ring-4 ring-white">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                    </svg>
                </span>
                Key benefits of using {brand}
            </h2>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((b, idx) => (
                    <div
                        key={idx}
                        className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm
                       hover:shadow-md hover:border-indigo-200
                       transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Icon */}
                        <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full
                            bg-gradient-to-br from-indigo-600 to-purple-600
                            text-white shadow-md ring-4 ring-white
                            group-hover:scale-110 transition-transform duration-300">
                            {b.icon ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={b.icon}
                                    alt={b.title ?? "Benefit icon"}
                                    className="w-6 h-6"
                                />
                            ) : (
                                <span className="text-xl" aria-hidden>
                                    {b.emoji ?? "💧"}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        {b.title && (
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {b.title}
                            </h3>
                        )}

                        {b.description && (
                            <p className="text-gray-700 leading-relaxed">
                                {b.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
