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
      className="flex items-center text-sm font-medium mb-10 pb-4" 
      aria-label="Breadcrumb"
    >
      {/* Main Glass Container */}
      <ol className="flex items-center gap-1 p-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500">
        
        {/* Home Link */}
        <li className="flex items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2 px-3.5 py-2 text-slate-500 hover:text-indigo-600 hover:bg-white/80 rounded-full transition-all duration-300 ease-out active:scale-95"
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline font-semibold tracking-tight">Home</span>
          </Link>
        </li>

        <li className="text-slate-300 flex items-center justify-center">
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </li>

        {/* Category Link */}
        <li className="flex items-center">
          <Link 
            href={`/category/${slugify(category)}`} 
            className="group flex items-center gap-2 px-3.5 py-2 text-slate-500 hover:text-indigo-600 hover:bg-white/80 rounded-full transition-all duration-300 ease-out active:scale-95"
          >
            <Layers className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="font-semibold tracking-tight truncate max-w-[60px] min-[400px]:max-w-[100px] sm:max-w-none">{category}</span>
          </Link>
        </li>

        <li className="text-slate-300 flex items-center justify-center">
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </li>

        {/* Current Page (Active) */}
        <li className="flex items-center pr-1">
          <span 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-full shadow-lg shadow-indigo-200/50 ring-1 ring-white/20 animate-in fade-in zoom-in duration-500" 
            aria-current="page"
          >
            <Info className="w-4 h-4" />
            <span className="font-bold tracking-tight truncate max-w-[80px] min-[400px]:max-w-[150px] sm:max-w-[300px] md:max-w-md">
              {title}
            </span>
          </span>
        </li>

      </ol>
    </nav>
  );
}
