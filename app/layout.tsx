import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

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
      <body className="min-h-screen text-slate-200" style={{ fontFamily: 'Hack, monospace', backgroundColor: '#0a0a0f' }}>
        {/* Background grid pattern */}
        <div 
          className="fixed inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            zIndex: 0
          }}
        />
        <div className="relative z-10">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
