import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// تحديد مسار ملف الـ JSON اللي فيه الشهادات
const dataFilePath = path.join(process.cwd(), 'src/data/certificates.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, course, date, description } = body;

    // التأكد من إن كل البيانات المطلوبة مبعوتة
    if (!id || !name || !course || !date) {
      return NextResponse.json({ error: 'جميع الحقول الأساسية مطلوبة' }, { status: 400 });
    }

    // 1. قراءة البيانات الحالية من الملف
    let certificates = [];
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      certificates = JSON.parse(fileData);
    }

    // 2. التأكد إن الـ ID مش متكرر
    const exists = certificates.some((cert: any) => cert.id === id);
    if (exists) {
      return NextResponse.json({ error: 'كود هذه الشهادة موجود بالفعل مسبقاً' }, { status: 400 });
    }

    // 3. تجهيز كائن الشهادة الجديدة
    const newCertificate = {
      id,
      name,
      course,
      date,
      description: description || 'تم اجتياز الدورة التدريبية بنجاح واستحقاق.'
    };

    // 4. إضافة الشهادة الجديدة وحفظ الملف
    certificates.push(newCertificate);
    fs.writeFileSync(dataFilePath, JSON.stringify(certificates, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'تم إضافة الشهادة بنجاح وتحديث السيستم!' });
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'حدث خطأ داخلي في السيرفر' }, { status: 500 });
  }
}