import Link from 'next/link';
import { slugify } from '@/app/utils/slugify';
import { Home, ChevronRight, Layers, Info } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  title: string;
}

export default function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  return (
    <nav 
      className="flex items-center text-sm font-medium mb-8 pb-4 overflow-hidden" 
      aria-label="Breadcrumb"
    >
      {/* Main Glass Container */}
      <ol className="flex items-center gap-1 p-1 bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 max-w-full">
        
        {/* Home Link */}
        <li className="flex-shrink-0 flex items-center">
          <Link 
            href="/" 
            aria-label="Go to Home"
            className="group flex items-center gap-2 px-2.5 py-1.5 md:px-3.5 md:py-2 text-slate-500 hover:text-indigo-600 hover:bg-white/80 rounded-full transition-all duration-300"
          >
            <Home className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="hidden md:inline font-semibold">Home</span>
          </Link>
        </li>

        <li className="text-slate-300 flex-shrink-0 flex items-center justify-center" aria-hidden="true">
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </li>

        {/* Category Link */}
        <li className="flex-shrink-0 flex items-center">
          <Link 
            href={`/category/${slugify(category)}`} 
            aria-label={`View all ${category} offers`}
            className="group flex items-center gap-2 px-2.5 py-1.5 md:px-3.5 md:py-2 text-slate-500 hover:text-indigo-600 hover:bg-white/80 rounded-full transition-all duration-300"
          >
            <Layers className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline font-semibold">{category}</span>
          </Link>
        </li>

        <li className="text-slate-300 flex-shrink-0 flex items-center justify-center" aria-hidden="true">
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </li>

        {/* Current Page (Active) */}
        <li className="flex-shrink flex items-center pr-1 min-w-0">
          <span 
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-full shadow-lg shadow-indigo-200/50 ring-1 ring-white/20 min-w-0" 
            aria-current="page"
          >
            <Info className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="font-bold truncate max-w-[80px] min-[320px]:max-w-[100px] min-[375px]:max-w-[140px] sm:max-w-[250px] md:max-w-md">
              {title}
            </span>
          </span>
        </li>

      </ol>
    </nav>
  );
}
