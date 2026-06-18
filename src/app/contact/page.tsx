'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // الـ States الخاصة بالمدخلات عشان نتحكم في الداتا ونربطها بـ EmailJS
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // الربط مع EmailJS غصب عنه
    // ملحوظة: غير الـ IDs دي بالـ IDs الحقيقية من حسابك في EmailJS بعدين
    emailjs.send(
      'service_h19a7vm',   // ID الخدمة (مثلاً gmail)
      'template_n0px5nh',  // ID القالب اللي صممته جوه الموقع
      {
        from_name: formData.user_name,
        from_email: formData.user_email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Tech Verse Team"
      },
      'yfX7x5OdXDLYSsi6j'     // الـ Public Key الخاص بحسابك
    )
    .then(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ user_name: '', user_email: '', subject: '', message: '' });
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      setLoading(false);
      setError('عذراً، حدث خطأ أثناء إرسال الرسالة. برجاء المحاولة مرة أخرى أو مراسلتنا مباشرة.');
    });
  };

  return (
    <main className="min-h-screen py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse gap-10 md:gap-16 items-start" dir="rtl">
        
        {/* ================= يمين: فورم التواصل المربوط بـ EmailJS ================= */}
        <div className="w-full md:w-3/5">
          <div className="mb-8 text-right">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              أرسل لنا رسالة ✉️
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              سواء كان لديك استفسار أو اقتراح، املأ النموذج وسيتواصل معك أحد مسؤولي مجتمعنا.
            </p>
          </div>

          {success ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/30 text-center transition-all animate-fade-in">
              <span className="text-4xl">🎉</span>
              <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mt-2">تم استلام رسالتك بنجاح!</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-1">شكراً لتواصلك، سيقوم فريق Tech Verse بالرد عليك عبر البريد الإلكتروني في أقرب وقت.</p>
              <Button onClick={() => setSuccess(false)} className="mt-4 text-xs">إرسال رسالة أخرى</Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl transition-all">
              
              {error && (
                <div className="p-3 text-sm rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-rose-600 dark:text-rose-400">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="الاسم الكامل" 
                  placeholder="محمد أحمد" 
                  required 
                  value={formData.user_name}
                  onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                />
                <Input 
                  label="البريد الإلكتروني" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={formData.user_email}
                  onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                />
              </div>
              
              <Input 
                label="الموضوع" 
                placeholder="استفسار بشأن شهادة / حجز كورس" 
                required 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />

              <div className="w-full flex flex-col gap-2 text-right">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">نص الرسالة</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="اكتب رسالتك أو تفاصيل استفسارك هنا بالتفصيل..."
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none resize-none
                    bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200
                    dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-violet-500 dark:focus:ring-violet-900/30"
                />
              </div>

              <Button type="submit" isLoading={loading} className="w-full">
                إرسال عبر EmailJS 🚀
              </Button>
            </form>
          )}
        </div>

        {/* ================= يسار: بطاقة معلومات التواصل الحقيقية للمجتمع ================= */}
        <div className="w-full md:w-2/5 md:sticky md:top-24 space-y-6">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-black mb-2">بيانات مجتمع Tech Verse 🌌</h2>
              <p className="text-xs text-violet-100/80 leading-relaxed">
                تقدر تكلمنا مباشرة على قنواتنا الرسمية المتاحة طوال اليوم لمساعدتك.
              </p>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-4 text-sm">
              {/* البريد الإلكتروني الرسمي */}
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-xl text-lg">📧</span>
                <div>
                  <p className="text-xs text-violet-200">البريد الإلكتروني</p>
                  <a href="mailto:techverse.community@gmail.com" className="font-semibold hover:underline">techverse.community@gmail.com</a>
                </div>
              </div>

              {/* رقم الواتساب والدعم الفني */}
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-xl text-lg">📞</span>
                <div>
                  <p className="text-xs text-violet-200">الدعم الفني (واتساب)</p>
                  <a href="https://wa.me/201285536282" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" dir="ltr">+20 128 553 6282</a>
                </div>
              </div>

              {/* المقر أو اللوكيشن الإقليمي */}
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-xl text-lg">📍</span>
                <div>
                  <p className="text-xs text-violet-200">الموقع الجغرافي</p>
                  <p className="font-semibold">جمهورية مصر العربية، الشرقية</p>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* سطر تشجيعي سفلي */}
            <p className="text-xs text-center text-violet-200/90 italic">
              "نتطلع دائماً لبناء جيل برمجى رائد ومتكامل"
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}