import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 dark:border-slate-900 bg-white dark:bg-slate-950 py-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400" dir="rtl">
        <p>© 2026 Tech Verse Community. جميع الحقوق محفوظة.</p>
        <p className="font-mono text-xs">Built with Next.js & Local JSON Database</p>
      </div>
    </footer>
  );
}