import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-2 text-right" dir="rtl">
      {label && (
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
          /* اللايت ثيم */
          bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200
          /* الدارك ثيم */
          dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-violet-500 dark:focus:ring-violet-900/30
          ${className}`}
        {...props}
      />
    </div>
  );
};