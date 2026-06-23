import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// دالة لجلب الكوبونات من ملف JSON بأمان على السيرفر
function getCoupons() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'coupons.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading coupons file:", error);
    return {};
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, couponCode, formData, finalPrice, appliedCoupon, discountPercentage, receiptImage } = body;

    const coupons = getCoupons();

    // 1. إجراء التحقق من الكوبون
    if (action === 'validate-coupon') {
      const code = couponCode.trim().toUpperCase();
      if (coupons.hasOwnProperty(code)) {
        return NextResponse.json({ success: true, discount: coupons[code] });
      }
      return NextResponse.json({ success: false, message: 'Invalid code' }, { status: 400 });
    }

    // 2. إجراء إرسال البيانات إلى تليجرام مع الصورة
    if (action === 'submit-registration') {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken || !chatId) {
        return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
      }

      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' });

      // تجهيز نص الرسالة
      const fullName = formData.fullName.trim();
      const message = `🔔 *New Bootcamp Registration* 🔔\n\n` +
                      `🖼️ _دي سكرين شوت المقدم: ${fullName}_\n\n` +
                      `👤 *Name:* ${fullName}\n` +
                      `📞 *WhatsApp:* +${formData.whatsappNumber.trim()}\n` +
                      `✉️ *Email:* ${formData.email.trim()}\n` +
                      `🎂 *Age:* ${formData.age}\n` +
                      `📍 *Governorate:* ${formData.governorate}\n\n` +
                      `💳 *Payment Method:* ${formData.paymentMethod}\n` +
                      `📱 *Sender Wallet No:* ${formData.transactionPhone.trim()}\n` +
                      `🔢 *Ref Number:* ${formData.referenceNumber.trim() || 'Not Provided'}\n` +
                      `📅 *Payment Date:* ${formData.paymentDate}\n\n` +
                      `🎟️ *Coupon Used:* ${appliedCoupon}\n` +
                      `📉 *Discount Amount:* ${discountPercentage}%\n` +
                      `💰 *Final Price Paid:* ${finalPrice} EGP\n\n` +
                      `📝 *Notes:* ${formData.notes.trim() || 'None'}\n` +
                      `⏰ *Time:* ${timestamp}`;

      let response;

      // إذا كانت السكرين شوت موجودة، نرسلها كصورة ومعها الرسالة في الـ caption
      if (receiptImage && receiptImage.startsWith('data:image/')) {
        // تفكيك الـ Base64 واستخراج البيانات الثنائية (Binary Data)
        const matches = receiptImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error('Invalid base64 image format');
        }
        
        const imageType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const blob = new Blob([buffer], { type: imageType });

        // بناء FormData لإرسال ملف حقيقي لتليجرام
        const telegramFormData = new FormData();
        telegramFormData.append('chat_id', chatId);
        telegramFormData.append('photo', blob, `receipt.${imageType.split('/')[1]}`);
        telegramFormData.append('caption', message);
        telegramFormData.append('parse_mode', 'Markdown');

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;
        response = await fetch(telegramUrl, {
          method: 'POST',
          body: telegramFormData, // نرسل الـ FormData مباشرة هنا
        });
      } else {
        // في حال عدم وجود صورة (حالة احتياطية) نرسلها كرسالة نصية عادية
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        response = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
          })
        });
      }

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Telegram API responded with status ${response.status}: ${errText}`);
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}