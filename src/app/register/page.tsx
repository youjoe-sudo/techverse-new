'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
// @ts-ignore
import 'react-phone-input-2/lib/style.css';

interface FormDataState {
  fullName: string;
  whatsappNumber: string;
  whatsappConfirm: boolean;
  email: string;
  age: string;
  governorate: string;
  paymentMethod: string;
  transactionPhone: string;
  referenceNumber: string;
  paymentDate: string;
  notes: string;
  termsAgree: boolean;
}

interface ErrorsState {
  [key: string]: boolean;
}

const BASE_PRICE = 350;

export default function RegistrationPage() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>('');

  const [formData, setFormData] = useState<FormDataState>({
    fullName: '',
    whatsappNumber: '',
    whatsappConfirm: false,
    email: '',
    age: '',
    governorate: '',
    paymentMethod: 'Vodafone Cash',
    transactionPhone: '',
    referenceNumber: '',
    paymentDate: '',
    notes: '',
    termsAgree: false,
  });

  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('None');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(BASE_PRICE);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean }>({ text: '', isError: false });
  const [errors, setErrors] = useState<ErrorsState>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    
    let checked = false;
    if (e.target instanceof HTMLInputElement && type === 'checkbox') {
      checked = e.target.checked;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  // معالج خاص لتحديث رقم الهاتف الخاص بمكتبة الدول
  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, whatsappNumber: value }));
    if (errors.whatsappNumber) {
      setErrors((prev) => ({ ...prev, whatsappNumber: false }));
    }
  };

  // تحويل الصورة إلى Base64 لإرسالها عبر الـ API
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const validateStep1 = (): boolean => {
    const newErrors: ErrorsState = {};
    
    if (formData.fullName.trim().length < 3) newErrors.fullName = true;
    
    if (formData.whatsappNumber.length < 8) {
      newErrors.whatsappNumber = true;
    }
    
    if (!formData.whatsappConfirm) newErrors.whatsappConfirm = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const acceptedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'live.com', 'icloud.com'];
    const currentDomain = formData.email.trim().toLowerCase().split('@')[1];
    if (!emailRegex.test(formData.email) || !acceptedDomains.includes(currentDomain)) {
      newErrors.email = true;
    }

    const ageNum = parseInt(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum <= 0) newErrors.age = true;
    if (!formData.governorate) newErrors.governorate = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // استدعاء الـ API للتحقق من الكوبون المخفي ف السيرفر
  const handleApplyCoupon = async () => {
    if (!discountCode.trim()) return;
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'validate-coupon', couponCode: discountCode })
      });

      if (res.ok) {
        const data = await res.json();
        setDiscountPercentage(data.discount);
        setAppliedCoupon(discountCode.trim().toUpperCase());
        setFinalPrice(BASE_PRICE - (BASE_PRICE * (data.discount / 100)));
        setCouponMessage({ text: `Code applied! ${data.discount}% discount verified.`, isError: false });
      } else {
        throw new Error();
      }
    } catch {
      setDiscountPercentage(0);
      setAppliedCoupon('None');
      setFinalPrice(BASE_PRICE);
      setCouponMessage({ text: 'Invalid discount token or code combination.', isError: true });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: ErrorsState = {};
    if (!formData.transactionPhone.trim()) newErrors.transactionPhone = true;
    if (!formData.paymentDate) newErrors.paymentDate = true;
    if (!formData.termsAgree) newErrors.termsAgree = true;
    if (!receiptFile) newErrors.receiptFile = true; // تم نقل التحقق من الإيصال هنا خطوة 2

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // تحويل الصورة لنص إذا كانت موجودة
      const base64Image = receiptFile ? await convertToBase64(receiptFile) : '';

      // إرسال البيانات للـ API السري لتمريرها لتليجرام
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit-registration',
          formData,
          finalPrice,
          appliedCoupon,
          discountPercentage,
          receiptImage: base64Image
        })
      });

      if (res.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("حدث خطأ أثناء الإرسال، برجاء التواصل معنا عبر الواتساب مباشرة.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased font-sans">
      {/* Main Container */}
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 py-10">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">Tech Verse NextGen 2026 Registration</h1>
              <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">Join 7 days of intensive online learning and explore future careers.</p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-10 max-w-md mx-auto">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 transition-all duration-300" style={{ width: step === 1 ? '0%' : '100%' }}></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm border-4 border-white">1</div>
                  <span className="text-xs font-medium mt-2 text-blue-600">Personal Info</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors duration-200 ${step === 2 ? 'bg-blue-600 text-white border-white border-4 shadow-sm' : 'bg-white text-slate-400 border-slate-200'}`}>{step === 2 ? '2' : '2'}</div>
                  <span className={`text-xs font-medium mt-2 ${step === 2 ? 'text-blue-600' : 'text-slate-400'}`}>Payment Details</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              <form onSubmit={handleSubmit} noValidate>
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Step 1: Personal Information</h2>
                    
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/50 outline-none text-sm" placeholder="John Doe" />
                      {errors.fullName && <p className="mt-1 text-xs text-red-500">Please enter your full name (minimum 3 characters).</p>}
                    </div>

                    {/* القائمة المتقدمة للدول */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Phone Number <span className="text-red-500">*</span></label>
                      <PhoneInput
                        country={'eg'}
                        enableSearch={true}
                        searchPlaceholder="Search country..."
                        value={formData.whatsappNumber}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: '100%', height: '42px', borderRadius: '8px', backgroundColor: '#f8fafc', fontSize: '14px' }}
                        containerStyle={{ direction: 'ltr' }}
                      />
                      {errors.whatsappNumber && <p className="mt-1 text-xs text-red-500">Please enter a valid phone number.</p>}
                      
                      <div className="mt-3 flex items-start">
                        <input type="checkbox" id="whatsappConfirm" checked={formData.whatsappConfirm} onChange={handleInputChange} className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                        <label htmlFor="whatsappConfirm" className="ml-2 text-sm text-slate-600 select-none">This number is active on WhatsApp <span className="text-red-500">*</span></label>
                      </div>
                      {errors.whatsappConfirm && <p className="mt-1 text-xs text-red-500">You must confirm this.</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/50 outline-none text-sm" placeholder="name@gmail.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-500">Please enter a valid educational/personal email.</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">Age <span className="text-red-500">*</span></label>
                        <input type="number" id="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/50 outline-none text-sm" placeholder="21" />
                        {errors.age && <p className="mt-1 text-xs text-red-500">Enter a valid age.</p>}
                      </div>
                      <div>
                        <label htmlFor="governorate" className="block text-sm font-medium text-slate-700 mb-1">Governorate / City <span className="text-red-500">*</span></label>
                        <select id="governorate" value={formData.governorate} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/50 outline-none text-sm text-slate-700">
                          <option value="">Select your city</option>
                          <option value="Cairo">Cairo (القاهرة)</option>
                          <option value="Giza">Giza (الجيزة)</option>
                          <option value="Alexandria">Alexandria (الإسكندرية)</option>
                          <option value="Qalyubia">Qalyubia (القليوبية)</option>
                          <option value="Dakahlia">Dakahlia (الدقهلية)</option>
                          <option value="Gharbia">Gharbia (الغربية)</option>
                          <option value="Monufia">Monufia (المنوفية)</option>
                          <option value="Sharqia">Sharqia (الشرقية)</option>
                          <option value="Beheira">Beheira (البحيرة)</option>
                          <option value="Damietta">Damietta (دمياط)</option>
                          <option value="Port Said">Port Said (بورسعيد)</option>
                          <option value="Ismailia">Ismailia (الإسماعيلية)</option>
                          <option value="Suez">Suez (السويس)</option>
                          <option value="Kafr El Sheikh">Kafr El Sheikh (كفر الشيخ)</option>
                          <option value="Fayoum">Fayoum (الفيوم)</option>
                          <option value="Beni Suef">Beni Suef (بني سويف)</option>
                          <option value="Minya">Minya (المنيا)</option>
                          <option value="Asyut">Asyut (أسيوط)</option>
                          <option value="Sohag">Sohag (سوهاج)</option>
                          <option value="Qena">Qena (قنا)</option>
                          <option value="Luxor">Luxor (الأقصر)</option>
                          <option value="Aswan">Aswan (أسوان)</option>
                          <option value="Red Sea">Red Sea (البحر الأحمر)</option>
                          <option value="New Valley">New Valley (الوادي الجديد)</option>
                          <option value="Matrouh">Matrouh (مطروح)</option>
                          <option value="North Sinai">North Sinai (شمال سيناء)</option>
                          <option value="South Sinai">South Sinai (جنوب سيناء)</option>
                          <option value="International">Outside Egypt (خارج مصر)</option>
                        </select>
                        {errors.governorate && <p className="mt-1 text-xs text-red-500">Please select your location.</p>}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end border-t border-slate-100">
                      <button type="button" onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition shadow-sm inline-flex items-center space-x-2">
                        <span>Continue to Payment</span>
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Step 2: Payment Information</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
      <div className="space-y-2 text-sm border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Event Summary</span>
        <div className="flex justify-between"><span className="text-slate-600">Event:</span> <strong className="text-slate-800">Tech Verse 2026</strong></div>
        <div className="flex justify-between"><span className="text-slate-600">Platform:</span> <strong className="text-slate-800">Google Meet</strong></div>
        <div className="flex justify-between"><span className="text-slate-600">Certificate:</span> <strong className="text-slate-800">Included & Verified From TechVerse</strong></div>
      </div>

      <div className="flex flex-col justify-between space-y-3">
        <div>
          <label htmlFor="discountCode" className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Have a Promo Code?</label>
          <div className="flex space-x-2">
            <input type="text" id="discountCode" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="flex-grow px-3 py-1.5 rounded-lg border border-slate-300 text-sm uppercase outline-none" placeholder="CODE" />
            <button type="button" onClick={handleApplyCoupon} className="bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs px-4 py-2 rounded-lg transition">Apply</button>
          </div>
          {couponMessage.text && <p className={`text-xs mt-1 font-medium ${couponMessage.isError ? 'text-red-500' : 'text-emerald-600'}`}>{couponMessage.text}</p>}
        </div>
        <div className="pt-2 border-t border-dashed border-slate-200 space-y-1 text-sm">
          <div className="flex justify-between text-slate-500"><span>Base Price:</span> <span>{BASE_PRICE} EGP</span></div>
          <div className="flex justify-between text-base font-bold text-slate-900 pt-1 border-t border-slate-200"><span>Final Price:</span> <span className="text-blue-600">{finalPrice} EGP</span></div>
        </div>
      </div>
    </div>

    {/* معلومات الحساب البنكي / المحفظة ديناميكياً حسب اختيار طريقة الدفع */}
    <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-sm text-slate-800 space-y-2 animate-fade-in">
      <span className="text-xs uppercase font-bold text-blue-600 tracking-wider block mb-1">⚠️ تفاصيل بيانات التحويل:</span>
      {formData.paymentMethod === 'Vodafone Cash' ? (
        <div className="space-y-1">
          <p>برجاء تحويل المبلغ إلى محفظة فودافون كاش التالية:</p>
          <p>📱 الرقم: <strong className="text-base font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-100 select-all">01285536282</strong></p>
          <p>👤 باسم العميل: <strong className="text-slate-900">Mohamed A**** A*********</strong></p>
        </div>
      ) : (
        <div className="space-y-1">
          <p>برجاء تحويل المبلغ عن طريق تطبيق انستا باي (InstaPay):</p>
          <p>🆔 عنوان الدفع (IPA): <strong className="text-base font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-100 select-all">abdelfata726@instapay</strong></p>
          <p>📱 أو رقم الهاتف: <strong className="text-base font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-100 select-all">01285536282</strong></p>
          <p>👤 باسم العميل: <strong className="text-slate-900">Mohamed A**** A*********</strong></p>
        </div>
      )}
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-700 mb-1">Payment Method | طريقة الدفع<span className="text-red-500">*</span></label>
          <select id="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50/50 text-sm text-slate-700">
            <option value="Vodafone Cash">Vodafone Cash</option>
            <option value="InstaPay">InstaPay</option>
          </select>
        </div>
        <div>
          <label htmlFor="transactionPhone" className="block text-sm font-medium text-slate-700 mb-1">Transaction Phone Number | رقم التحويل<span className="text-red-500">*</span></label>
          <input type="text" id="transactionPhone" value={formData.transactionPhone} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm" placeholder="Wallet number" />
          {errors.transactionPhone && <p className="mt-1 text-xs text-red-500">Required field.</p>}
        </div>
      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="referenceNumber" className="block text-sm font-medium text-slate-700 mb-1">Ref Number | رقم التحويل<span className="text-slate-400">(Optional)</span></label>
                          <input type="text" id="referenceNumber" value={formData.referenceNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm" />
                        </div>
                        <div>
                          <label htmlFor="paymentDate" className="block text-sm font-medium text-slate-700 mb-1">Payment Date | تاريخ التحويل<span className="text-red-500">*</span></label>
                          <input type="date" id="paymentDate" value={formData.paymentDate} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-600" />
                          {errors.paymentDate && <p className="mt-1 text-xs text-red-500">Required field.</p>}
                        </div>
                      </div>

                      {/* خانة رفع سكرين شوت التحويل */}
                      <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Upload Transaction Screenshot / سكرين شوت التحويل <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <label className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition">
                            <svg className="w-4 h-4 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>Choose Image</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setReceiptFile(file);
                                  setReceiptPreview(URL.createObjectURL(file));
                                  if (errors.receiptFile) setErrors(prev => ({ ...prev, receiptFile: false }));
                                }
                              }} 
                            />
                          </label>
                          <div className="text-xs text-slate-500 truncate max-w-xs">
                            {receiptFile ? receiptFile.name : "No file selected (JPG, PNG)"}
                          </div>
                        </div>

                        {/* معاينة الصورة المرفوعة */}
                        {receiptPreview && (
                          <div className="mt-3 relative w-32 h-32 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-inner">
                            <img src={receiptPreview} alt="Receipt Preview" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => { setReceiptFile(null); setReceiptPreview(''); }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                        )}
                        {errors.receiptFile && <p className="mt-1 text-xs text-red-500">Please upload a screenshot of the transaction receipt.</p>}
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">Notes <span className="text-slate-400">(Optional)</span></label>
                        <textarea id="notes" rows={2} value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm"></textarea>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-5 space-y-4">
                      <div className="flex items-start">
                        <input type="checkbox" id="termsAgree" checked={formData.termsAgree} onChange={handleInputChange} className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded" />
                        <label htmlFor="termsAgree" className="ml-2 text-sm text-slate-700 select-none">I agree to the Terms & Conditions <span className="text-red-500">*</span></label>
                      </div>
                      {errors.termsAgree && <p className="mt-1 text-xs text-red-500">You must agree.</p>}
                    </div>

                    <div className="pt-4 flex justify-between border-t border-slate-100">
                      <button type="button" onClick={handlePrevStep} className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm px-5 py-2.5 rounded-lg transition">Back</button>
                      <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition shadow-sm disabled:bg-slate-400">
                        {isSubmitting ? 'Processing...' : 'Complete Registration'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-xl mx-auto my-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Registration Submitted Successfully</h2>
            <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-slate-900 text-white font-medium text-sm rounded-lg">Back to Homepage</button>
          </div>
        )}
      </main>

      <footer className="w-full bg-white border-t border-slate-200 py-6 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <span>© 2026 Tech Verse. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}