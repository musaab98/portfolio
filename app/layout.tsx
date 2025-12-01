import './globals.css';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-200" style={{ fontFamily: 'Hack, monospace' }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-slate-400">Open to work</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="/" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">About</a>
            <a href="/portfolio" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Portfolio</a>
            <a href="/contact" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Contact</a>
            <a href="/admin" className="text-sm text-slate-600 hover:text-slate-500 transition-colors">Admin</a>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
