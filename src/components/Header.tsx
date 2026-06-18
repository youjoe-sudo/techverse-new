'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  // أول ما الصفحة تفتح، نشوف لو كان مسيف ثيم معين قبل كده
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // دالة التبديل بين الـ Light والـ Dark
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between" dir="rtl">
        
        {/* اللوجو */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <span className="text-violet-600 dark:text-violet-400">Verse</span> Tech
        </Link>

{/* لينكات التنقل داخل src/components/Header.tsx */}
<nav className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
  <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">الرئيسية</Link>
  <Link href="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">من نحن</Link>
  <Link href="/verify" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors bg-violet-50 dark:bg-violet-950/40 px-3 py-1.5 rounded-lg text-violet-600 dark:text-violet-400 font-semibold">التحقق من الشهادات 🎓</Link>
  <Link href="/contact" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">تواصل معنا</Link>
</nav>

        {/* زرار الثيم المودرن */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 transition-all active:scale-95"
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            // أيقونة الشمس للـ Light Mode
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 5.657a4 4 0 118 0 4 4 0 01-8 0z" />
            </svg>
          ) : (
            // أيقونة القمر للـ Dark Mode
            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

      </div>
    </header>
  );
}