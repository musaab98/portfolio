import React from 'react';
import { supabase } from '@/lib/supabase';

export default async function Navbar() {
  const { data } = await supabase.from('about').select('open_to_work').single();
  const isOpenToWork = data?.open_to_work ?? true;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900">
        {isOpenToWork ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-slate-400">Open to work</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-slate-400">Not seeking opportunities</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-8">
        <a href="/" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">About</a>
        <a href="/portfolio" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Portfolio</a>
        <a href="/contact" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Contact</a>
        <a href="/admin" className="text-sm text-slate-600 hover:text-slate-500 transition-colors">Admin</a>
      </div>
    </nav>
  );
}
