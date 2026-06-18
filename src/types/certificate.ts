export interface Certificate {
  id: string;          // كود الشهادة الفريد (مثال: TV-2026-001)
  studentName: string; // اسم الطالب ثلاثي أو ثنائي
  track: string;       // اسم الكورس أو الورشة
  issueDate: string;   // تاريخ الإصدار
  status: 'Valid' | 'Revoked'; // حالة الشهادة (سارية أو ملغية)
  instructor: string;  // اسم المحاضر
  description : string; // وصف الشهادة أو الإشادة (اختياري)
}