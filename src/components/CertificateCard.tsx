import React from 'react';
import { Certificate } from '../types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div 
      className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border transition-all duration-300 shadow-xl relative overflow-hidden text-right
        /* اللايت */
        bg-gradient-to-br from-white to-slate-50 border-slate-200/80 text-slate-800
        /* الدارك */
        dark:from-slate-900 dark:to-slate-950 dark:border-slate-800/80 dark:text-slate-100"
      dir="rtl"
    >
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* الهيدر بتاع الكارت */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full">
            {certificate.id}
          </span>
          <h3 className="text-xl font-bold mt-2">شهادة إتمام وتخرج موثقة</h3>
        </div>
        
        {/* حالة الشهادة */}
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/30 font-semibold text-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          شهادة معتمدة وسارية
        </div>
      </div>

      {/* تفاصيل البيانات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500">اسم الطالب</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{certificate.studentName}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500">المسار التدريبي (Track)</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{certificate.track}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500">تاريخ الإصدار</p>
          <p className="text-base font-medium mt-1">{certificate.issueDate}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500">المحاضر / المسؤول</p>
          <p className="text-base font-medium mt-1">{certificate.instructor}</p>
        </div>
{/* هنا قفلنا شبكة الـ Grid عشان نفصل الوصف عنها */}
</div>

{/* سيكشن الوصف المتسنتر والمميز بخط فخم */}
<div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 text-center w-full max-w-xl mx-auto">
  <p className="text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400">
    تفاصيل الشهادة 📜
  </p>
  <p className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-200 mt-3 leading-relaxed tracking-wide antialiased">
    {certificate.description}
  </p>
</div>

      {/* الفوتر السفلي للكارت */}
      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
        <p>مؤسسة Tech Verse للتدريب والتطوير</p>
        <p className="font-mono">Secure Verification System</p>
      </div>
    </div>
  );
};