'use client';

import { useState } from 'react';
// تأكدنا من مسارات الـ Imports والـ Types
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CertificateCard } from '../../components/CertificateCard';
import { Certificate } from '../../types/certificate';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);

  // هنا حل مشكلة الخطأ 7006 بتحديد نوع الـ Event بدقة للـ Form
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setCertificate(null);

    try {
      const res = await fetch(`/api/verify?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ ما');
      }

      setCertificate(data);
    } catch (err: any) {
      setError(err.message || 'كود الشهادة غير صحيح، يرجى التأكد وإعادة المحاولة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        {/* الهيدر */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          التحقق من صحة الشهادات 🎓
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-10 text-sm md:text-base">
          أدخل كود الشهادة الخاص بك للتأكد من اعتمادها وصحة بياناتها من قاعدة بيانات Tech Verse.
        </p>

        {/* فورم البحث */}
        <form onSubmit={handleVerify} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 items-end mb-12">
          <div className="w-full">
            <Input
              placeholder="مثال: TV-2026-001"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" isLoading={loading} className="w-full sm:w-auto whitespace-nowrap">
            تحقق الآن
          </Button>
        </form>

        {/* عرض النتائج */}
        <div className="mt-8 transition-all duration-300">
          {error && (
            <div className="max-w-md mx-auto p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium text-sm">
              🛑 {error}
            </div>
          )}

          {certificate && <CertificateCard certificate={certificate} />}
        </div>
      </div>
    </main>
  );
}