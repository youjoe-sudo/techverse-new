import { NextResponse } from 'next/server';
import { Certificate } from '../../../types/certificate';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  // 1. نجيب الكود من الـ Query Parameters للـ URL
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code')?.trim();

  if (!code) {
    return NextResponse.json({ error: 'برجاء إدخال كود الشهادة' }, { status: 400 });
  }

  try {
    // 2. نحدد مسار ملف الـ JSON ونقرأه
    const filePath = path.join(process.cwd(), 'src/data/certificates.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const certificates: Certificate[] = JSON.parse(fileData);

    // 3. نبحث عن الشهادة بالكود (Case-insensitive عشان لو الطالب كتب الحروف Capital أو Small)
    const certificate = certificates.find(
      (cert) => cert.id.toLowerCase() === code.toLowerCase()
    );

    // 4. لو مش موجودة نرجع 404
    if (!certificate) {
      return NextResponse.json({ error: 'عذراً، هذا الكود غير مسجل لدينا أو غير صحيح' }, { status: 404 });
    }

    // 5. لو موجودة نرجع بيانات الشهادة بنجاح
    return NextResponse.json(certificate, { status: 200 });

  } catch (error) {
    console.error('Database read error:', error);
    return NextResponse.json({ error: 'حدث خطأ في السيرفر أثناء قراءة البيانات' }, { status: 500 });
  }
}