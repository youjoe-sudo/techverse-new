'use client';

import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isCustomCourse, setIsCustomCourse] = useState(false);
// ضيف دول جوه الـ AdminDashboard في أول سطرين
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [password, setPassword] = useState('');

if (!isAuthenticated) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4" dir="rtl">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-sm text-center">
        <h2 className="text-xl font-black text-white mb-4">لوحة تحكم Tech Verse 🔐</h2>
        <input 
          type="password" 
          placeholder="أدخل كلمة مرور المسؤول..." 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-center outline-none focus:border-violet-500 mb-4"
        />
        <Button 
          onClick={() => {
            if (password === 'TechVerse@2026') { // اكتب الباسورد اللي يعجبك هنا
              setIsAuthenticated(true);
            } else {
              alert('كلمة المرور خاطئة يا غالي! ❌');
            }
          }} 
          className="w-full"
        >
          تسجيل الدخول
        </Button>
      </div>
    </div>
  );
}

// ... باقي الكود القديم بتاع الـ return الأساسي لصفحة الأدمن ينزل تحت هنا عل طول
  const [certData, setCertData] = useState({
    id: '',
    name: '',
    course: '',
    date: '',
    description: ''
  });

  // قائمة الاختيارات الثابتة
  const courseOptions = [
    "Season 1 | PR",
    "Season 1 | HR",
    "Season 1 | Graphic Design",
    "Season 1 | Marketing"
  ];

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "other") {
      setIsCustomCourse(true);
      setCertData({ ...certData, course: '' }); // تصفير القيمة ليكتبها بنفسه
    } else {
      setIsCustomCourse(false);
      setCertData({ ...certData, course: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ ما');
      }

      setMessage({ text: '🎉 تم تسجيل الشهادة بنجاح وتحديث قاعدة البيانات!', isError: false });
      setCertData({ id: '', name: '', course: '', date: '', description: '' });
      setIsCustomCourse(false);
    } catch (err: any) {
      setMessage({ text: err.message || 'فشل الاتصال بالسيرفر', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto" dir="rtl">
        
        {/* هيدر لوحة التحكم */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              لوحة تحكم الشهادات 🛠️
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              من هنا تقدر تضيف شهادات الطلاب الجداد لـ Tech Verse وهي تسمع تلقائياً في السيستم.
            </p>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-200/40">
            حساب المسؤول (Admin)
          </span>
        </div>

        {/* رسائل التنبيه والنجاح */}
        {message.text && (
          <div className={`p-4 mb-6 rounded-xl border text-sm font-semibold transition-all ${
            message.isError 
              ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400' 
              : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* فورم إضافة الشهادة */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input 
              label="كود السيريال الفريد (Certificate ID)" 
              placeholder="مثال: TV-2026-XYZ" 
              required 
              value={certData.id}
              onChange={(e) => setCertData({...certData, id: e.target.value.trim()})}
            />
            <Input 
              label="اسم الطالب ثلاثي" 
              placeholder="اسم الطالب الكامل باللغة العربية" 
              required 
              value={certData.name}
              onChange={(e) => setCertData({...certData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* قايمة منسدلة أو حقل نصي حسب الاختيار بنفس الديزاين الطرش */}
            <div className="flex flex-col gap-2 text-right w-full">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                اسم الكورس / الورشة التدريبية
              </label>
              
              {!isCustomCourse ? (
                <div className="relative">
                  <select
                    required
                    onChange={handleCourseChange}
                    value={certData.course}
                    className="w-full px-4 py-3 rounded-xl border appearance-none cursor-pointer transition-all duration-200 outline-none
                      bg-white border-slate-200 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200
                      dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:focus:border-violet-500 dark:focus:ring-violet-900/30"
                  >
                    <option value="" disabled>اختر المسار التدريبي...</option>
                    {courseOptions.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                    <option value="other" className="text-violet-600 dark:text-violet-400 font-bold">أخرى (كتابة مسار مخصص)...</option>
                  </select>
                  {/* سهم مخصص شكلة شيك بدل سهم المتصفح القديم */}
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 animate-[fadeIn_0.2s_ease-out]">
                  <Input 
                    placeholder="اكتب اسم الكورس الجديد هنا..." 
                    required 
                    value={certData.course}
                    onChange={(e) => setCertData({...certData, course: e.target.value})}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => { setIsCustomCourse(false); setCertData({...certData, course: ''}); }}
                    className="px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                    title="العودة للقائمة الرئيسية"
                  >
                    رجوع
                  </button>
                </div>
              )}
            </div>

            <Input 
              label="تاريخ الإصدار" 
              type="date" 
              required 
              value={certData.date}
              onChange={(e) => setCertData({...certData, date: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              وصف الشهادة أو الإشادة (اختياري)
            </label>
            <textarea
              rows={3}
              value={certData.description}
              onChange={(e) => setCertData({...certData, description: e.target.value})}
              placeholder="اكتب تفاصيل إضافية زي التقدير أو المحاور الأساسية... لو سبتها فاضية هينزل وصف افتراضي مروق."
              className="w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none resize-none
                bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200
                dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-violet-500 dark:focus:ring-violet-900/30"
            />
          </div>

          <Button type="submit" isLoading={loading} className="w-full font-bold">
            اعتماد وإضافة الشهادة للسيستم 🚀
          </Button>
        </form>

      </div>
    </main>
  );
}