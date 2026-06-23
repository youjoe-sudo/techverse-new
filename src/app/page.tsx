'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen relative bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      
      {/* عناصر الخلفية الديناميكية */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] pointer-events-none animate-pulse duration-[4000ms]" />

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col items-center gap-16 md:gap-24" dir="rtl">
        
        {/* ================= HERO SECTION ================= */}
        <div className="w-full text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* شارة علوية فخمة بـ تأثير زجاجي */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-violet-600 dark:text-violet-400 border border-slate-200/50 dark:border-slate-800/80 mb-8 shadow-sm transition-transform hover:scale-105 duration-300">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
            🚀 بوابتك لتجربة تعليمية تقنية فريدة من نوعها
          </span>

          {/* لوجو التيم التفاعلي */}
          <div className="mb-8 relative group cursor-pointer">
            {/* تأثير الإضاءة الخلفية (Glow) */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            
            {/* حاوية اللوجو الدائرية المتحركة */}
            <div className="relative w-28 h-28 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center p-3 shadow-xl animate-[bounce_4s_infinite_ease-in-out] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Image 
                src="/logo.png" 
                alt="Tech Verse Logo"
                width={90}    
                height={90}    
                className="object-contain rounded-full"
                priority       
              />
            </div>
          </div>

          {/* العنوان الرئيسي الطرش */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white leading-tight sm:leading-none mb-6 tracking-tight">
            ابدأ رحلتك في <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-300">
              عالم التكنولوجيا
            </span> المتقدمة
          </h1>
          
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            نحن في مجتمع <strong className="text-slate-900 dark:text-white">Tech Verse</strong> نهدف إلى تمكين الشباب وتدريبهم على البرمجة والذكاء الاصطناعي بشكل عملي يواكب متطلبات العصر.
          </p>

          {/* أزرار الـ Hero (CTA) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link 
              href="/verify" 
              className="w-full sm:w-auto px-10 py-4 font-extrabold rounded-2xl text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 dark:from-violet-500 dark:to-indigo-500 shadow-xl shadow-violet-500/20 dark:shadow-violet-950/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-center"
            >
              التحقق من شهادتك 🎓
            </Link>
            
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-10 py-4 font-bold rounded-2xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-center"
            >
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* ================= BOOTCAMP REGISTRATION SECTION (جديد ومثير للإنتباه) ================= */}
        <div className="w-full max-w-5xl bg-gradient-to-br from-violet-600 to-indigo-700 dark:from-violet-900 dark:to-indigo-950 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20 dark:shadow-none border border-violet-500/30">
          {/* تأثيرات خلفية للسكشن */}
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-fuchsia-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="flex-1 space-y-6 text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-white/20 text-white backdrop-blur-sm border border-white/10 uppercase tracking-wide">
                🔥 لفترة محدودة جداً
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                سجل الآن في الـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">NextGen Bootcamp 2026</span> واضمن مقعدك!
              </h2>
              
              <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed max-w-2xl">
                انضم إلينا في 7 أيام مكثفة من التعلم الفعلي والتطبيق العملي عبر الإنترنت. اكتشف شغفك الحقيقي، وابدأ في بناء مستقبلك المهني والبرمجي بأحدث أدوات الذكاء الاصطناعي والتكنولوجيا الحالية.
              </p>

              {/* مميزات سريعة تشد العين */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-indigo-50 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-lg">✔</span> تطبيق عملي ومشاريع حقيقية.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-lg">✔</span> شهادة معتمدة عند إتمام التدريب.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-lg">✔</span> منصة تعليمية ذكية ومتابعة دورية.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-lg">✔</span> كود خصم خاص للمجموعات والطلاب.
                </div>
              </div>
            </div>

            {/* زرار التقديم الطرش */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col items-center gap-2">
              <div className="relative group w-full sm:w-auto">
                {/* توهج خلف الزر */}
                <div className="absolute inset-0 bg-amber-400 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto relative inline-flex items-center justify-center gap-3 px-10 py-5 font-black text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-300 shadow-2xl rounded-2xl text-center text-lg transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
                >
                  سجل الآن وقدم فوراً 🚀
                </Link>
              </div>
              <span className="text-xs text-indigo-200/70 font-medium">التقديم يأخذ أقل من دقيقتين</span>
            </div>
          </div>
        </div>

        {/* ================= LUVIA LMS SECTION ================= */}
        <div className="w-full max-w-5xl bg-gradient-to-br from-white to-slate-100/50 dark:from-slate-900 dark:to-slate-950 rounded-3xl p-8 md:p-12 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 transition-transform hover:shadow-violet-500/5 dark:hover:shadow-violet-500/10 border-t-4 border-t-violet-500">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex-1 space-y-4 text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 dark:bg-violet-500 flex items-center justify-center text-white shadow-md font-mono font-black text-sm">
                LV
              </div>
              <span className="text-sm font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                Luvia Platform
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              منصة Luvia التعليمية الذكية 🧠
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              منصتنا الحصرية والـ LMS الخاص بنا لإدارة وتفعيل الكورسات التعليمية عن طريق نظام الـ Vouchers المبتكر. سجل دخولك الآن لتتابع مساراتك التدريبية.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <a 
              href="https://luvia-one.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 font-black rounded-2xl text-white bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-xl transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
            >
              تسجيل الدخول إلى Luvia 
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <div className="fixed bottom-6 left-6 z-50">
        <a 
          href="https://wa.me/201285536282" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="Contact on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
          
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.143 1.233 8.384 3.475C22.483 5.717 23.713 8.697 23.712 11.86c-.003 6.538-5.328 11.86-11.859 11.86-2.004-.001-3.973-.51-5.713-1.48L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.405.001 9.808-4.379 9.81-9.743.001-2.599-1.012-5.042-2.853-6.884C16.44 2.136 13.992 1.121 11.395 1.121c-5.408 0-9.81 4.38-9.813 9.744-.001 1.995.526 3.943 1.528 5.666L2.142 21.8l5.505-1.444z" />
          </svg>
          
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            راسلنا على واتساب 💬
          </span>
        </a>
      </div>

    </main>
  );
}