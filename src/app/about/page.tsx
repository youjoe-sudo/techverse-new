import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-right" dir="rtl">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            من نحن وعن مجتمعنا 🌌
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            مجتمع تقني شبابي يهدف لنشر الوعي البرمجي وبناء جيل قادر على المنافسة في سوق العمل الحديث.
          </p>
        </div>

        {/* سكشن الرؤية والأهداف */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md">
            <span className="text-2xl">🎯</span>
            <h3 className="text-xl font-bold mt-2 mb-2 text-slate-900 dark:text-white">رسالتنا</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              تقديم ورش عمل تدريبية وتطبيقية في مجالات الويب، الذكاء الاصطناعي، والأمن السيبراني بطرق مبسطة تناسب طموح الشباب والطلاب.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md">
            <span className="text-2xl">🚀</span>
            <h3 className="text-xl font-bold mt-2 mb-2 text-slate-900 dark:text-white">رؤيتنا</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              أن نكون المنصة الأولى والبيئة التعليمية الأكثر أماناً وتحفيزاً للشباب الشغوف بالتكنولوجيا لتبادل الخبرات وبناء مشاريع واقعية.
            </p>
          </div>
        </div>

        {/* سكشن قيم المجتمع */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md">
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">ما يميز Tech Verse؟</h3>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-violet-500 font-bold">✓</span>
              <span><strong>التطبيق العملي:</strong> لا نكتفي بالشرح النظري، كل ورشة عمل تنتهي بمشروع حقيقي يضاف لمعرض أعمال الطالب.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-500 font-bold">✓</span>
              <span><strong>شهادات موثقة رقمياً:</strong> نظام تحقق متكامل يضمن مصداقية الشهادة الممنوحة للطلاب عبر أكواد فريدة.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-500 font-bold">✓</span>
              <span><strong>بيئة تفاعلية:</strong> دعم فني ومستمر بين الطلاب والمحاضرين لضمان استمرارية التعلم وحل المشكلات الفنية.</span>
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}