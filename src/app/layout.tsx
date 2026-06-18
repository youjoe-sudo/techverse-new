import './globals.css'; // غيرنا @/app/globals.css وخليناها كدا عل طول
import type { Metadata } from 'next';
import Header from '../components/Header'; // مسار مباشر للهيدر
import Footer from '../components/Footer'; // مسار مباشر للفوتر

export const metadata: Metadata = {
  title: 'Tech Verse | منصة التدريب والتحقق من الشهادات',
  description: 'الموقع الرسمي لـ Tech Verse لتقديم الورش التقنية والتحقق الموثق من شهادات الطلاب.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" className="scroll-smooth">
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased transition-colors duration-300">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}