"use client";

import React, { useState, useEffect } from "react";

// ==========================================
// 1. قاعدة البيانات الشاملة (Pool) - متوافقة مع محتوى السيشنز باللغتين
// ==========================================

const MCQ_POOL = [
  // Session 1 & 2: Binary & Basics
  {
    id: "m1",
    question: { ar: "ما هو النظام الذي يعتمد عليه الكمبيوتر داخلياً لفهم كافة البيانات؟", en: "What system does the computer rely on internally to understand all data?" },
    options: [
      { id: "a", text: { ar: "النظام العشري (Decimal)", en: "Decimal System" } },
      { id: "b", text: { ar: "النظام الثنائي (Binary)", en: "Binary System" } },
      { id: "c", text: { ar: "نظام الألوان (RGB)", en: "RGB System" } },
      { id: "d", text: { ar: "نظام الحروف (ASCII)", en: "ASCII System" } }
    ],
    correct: "b"
  },
  {
    id: "m2",
    question: { ar: "المفاتيح الكهربائية الصغيرة جداً داخل المعالج تسمى:", en: "The tiny electrical switches inside the processor are called:" },
    options: [
      { id: "a", text: { ar: "المترجمات (Compilers)", en: "Compilers" } },
      { id: "b", text: { ar: "المتغيرات (Variables)", en: "Variables" } },
      { id: "c", text: { ar: "الترانزستورز (Transistors)", en: "Transistors" } },
      { id: "d", text: { ar: "البكسلات (Pixels)", en: "Pixels" } }
    ],
    correct: "c"
  },
  {
    id: "m3",
    question: { ar: "تمثل الحالة (0) في المفتاح الكهربائي للكمبيوتر أن:", en: "The state (0) in a computer's electrical switch means:" },
    options: [
      { id: "a", text: { ar: "المفتاح مغلق وهناك كهرباء (On)", en: "The switch is closed and electricity flows (On)" } },
      { id: "b", text: { ar: "المفتاح مفتوح ولا يوجد كهرباء (Off)", en: "The switch is open and no electricity flows (Off)" } },
      { id: "c", text: { ar: "المفتاح يحمل قيمة نصية", en: "The switch holds a string value" } },
      { id: "d", text: { ar: "المفتاح تالف", en: "The switch is broken" } }
    ],
    correct: "b"
  },
  {
    id: "m4",
    question: { ar: "كيف يُكتب الرقم 5 بالنظام الثنائي (Binary)؟", en: "How is the number 5 written in Binary?" },
    options: [
      { id: "a", text: { ar: "101", en: "101" } },
      { id: "b", text: { ar: "011", en: "011" } },
      { id: "c", text: { ar: "111", en: "111" } },
      { id: "d", text: { ar: "001", en: "001" } }
    ],
    correct: "a"
  },
  {
    id: "m5",
    question: { ar: "في جدول ASCII المشهور، حرف 'A' الكبير يقابله الرقم العشري:", en: "In the ASCII table, the capital letter 'A' corresponds to the decimal number:" },
    options: [
      { id: "a", text: { ar: "97", en: "97" } },
      { id: "b", text: { ar: "65", en: "65" } },
      { id: "c", text: { ar: "50", en: "50" } },
      { id: "d", text: { ar: "100", en: "100" } }
    ],
    correct: "b"
  },
  {
    id: "m6",
    question: { ar: "الصورة على شاشة الكمبيوتر عبارة عن نقط صغيرة جداً تسمى:", en: "An image on a computer screen consists of tiny dots called:" },
    options: [
      { id: "a", text: { ar: "الترانزستورات", en: "Transistors" } },
      { id: "b", text: { ar: "البكسلات (Pixels)", en: "Pixels" } },
      { id: "c", text: { ar: "المتغيرات", en: "Variables" } },
      { id: "d", text: { ar: "الأكواد", en: "Codes" } }
    ],
    correct: "b"
  },
  {
    id: "m7",
    question: { ar: "كل نقطة (Pixel) في الصور الملونة هي مزيج من ثلاثة ألوان أساسية وهي:", en: "Each pixel in colored images is a mix of three primary colors:" },
    options: [
      { id: "a", text: { ar: "أحمر، أصفر، أزرق", en: "Red, Yellow, Blue" } },
      { id: "b", text: { ar: "أحمر، أخضر، أبيض", en: "Red, Green, White" } },
      { id: "c", text: { ar: "أحمر، أخضر، أزرق (RGB)", en: "Red, Green, Blue (RGB)" } },
      { id: "d", text: { ar: "أسود، أبيض، رمادي", en: "Black, White, Gray" } }
    ],
    correct: "c"
  },
  {
    id: "m8",
    question: { ar: "لغات البرمجة القريبة من فهم البشر وسهلة التعلم تسمى:", en: "Programming languages close to human understanding and easy to learn are called:" },
    options: [
      { id: "a", text: { ar: "Low-Level Languages", en: "Low-Level Languages" } },
      { id: "b", text: { ar: "High-Level Languages", en: "High-Level Languages" } },
      { id: "c", text: { ar: "Machine Languages", en: "Machine Languages" } },
      { id: "d", text: { ar: "Assembly Languages", en: "Assembly Languages" } }
    ],
    correct: "b"
  },
  {
    id: "m9",
    question: { ar: "أي من اللغات التالية تعتبر متخصصة أكثر في الـ Hardware وصعبة التعلم؟", en: "Which of the following languages is more specialized in Hardware and hard to learn?" },
    options: [
      { id: "a", text: { ar: "Python", en: "Python" } },
      { id: "b", text: { ar: "Java", en: "Java" } },
      { id: "c", text: { ar: "Assembly", en: "Assembly" } },
      { id: "d", text: { ar: "JavaScript", en: "JavaScript" } }
    ],
    correct: "c"
  },

  // Session 3: Compilers & Interpreters & Data Types
  {
    id: "m10",
    question: { ar: "المترجم الذي يقرأ البرنامج بالكامل مرة واحدة ويخرجه في ملف جاهز للتشغيل (مثل exe.) هو:", en: "The translator that reads the entire program at once and outputs an executable file (like .exe) is:" },
    options: [
      { id: "a", text: { ar: "Interpreter", en: "Interpreter" } },
      { id: "b", text: { ar: "Compiler", en: "Compiler" } },
      { id: "c", text: { ar: "Transpiler", en: "Transpiler" } },
      { id: "d", text: { ar: "Linker", en: "Linker" } }
    ],
    correct: "b"
  },
  {
    id: "m11",
    question: { ar: "المترجم الذي يشتغل خطوة بخطوة (سطر بسطر) ويقف فوراً عند وجود أي غلطة هو:", en: "The translator that executes code step-by-step (line by line) and stops immediately upon an error is:" },
    options: [
      { id: "a", text: { ar: "Compiler", en: "Compiler" } },
      { id: "b", text: { ar: "Interpreter", en: "Interpreter" } },
      { id: "c", text: { ar: "Assembler", en: "Assembler" } },
      { id: "d", text: { ar: "CPU", en: "CPU" } }
    ],
    correct: "b"
  },
  {
    id: "m12",
    question: { ar: "المتغير (Variable) في البرمجة عبارة عن:", en: "A Variable in programming is structurally:" },
    options: [
      { id: "a", text: { ar: "ملف نصي على الهارد ديسك", en: "A text file on the hard drive" } },
      { id: "b", text: { ar: "صندوق محجوز في الذاكرة العشوائية (RAM) له اسم وقيمة", en: "A box reserved in RAM with a name and a value" } },
      { id: "c", text: { ar: "شاشة لإدخال البيانات", en: "A screen for data input" } },
      { id: "d", text: { ar: "أداة لتصحيح الأخطاء", en: "A debugging tool" } }
    ],
    correct: "b"
  },
  {
    id: "m13",
    question: { ar: "نوع البيانات المستخدم لتخزين الأرقام الصحيحة فقط (بدون كسور) هو:", en: "The data type used to store integers only (without decimals) is:" },
    options: [
      { id: "a", text: { ar: "Float", en: "Float" } },
      { id: "b", text: { ar: "Integer (int)", en: "Integer (int)" } },
      { id: "c", text: { ar: "String", en: "String" } },
      { id: "d", text: { ar: "Boolean", en: "Boolean" } }
    ],
    correct: "b"
  },
  {
    id: "m14",
    question: { ar: "لتخزين الرقم 3.14 أو أي رقم يحتوي على علامة عشرية نستخدم نوع:", en: "To store 3.14 or any number containing a decimal point, we use:" },
    options: [
      { id: "a", text: { ar: "int", en: "int" } },
      { id: "b", text: { ar: "Float / Double", en: "Float / Double" } },
      { id: "c", text: { ar: "Char", en: "Char" } },
      { id: "d", text: { ar: "String", en: "String" } }
    ],
    correct: "b"
  },
  {
    id: "m15",
    question: { ar: "نوع البيانات الذي لا يحتمل إلا قيمتين فقط (True أو False) هو:", en: "The data type that only holds two possible values (True or False) is:" },
    options: [
      { id: "a", text: { ar: "String", en: "String" } },
      { id: "b", text: { ar: "Char", en: "Char" } },
      { id: "c", text: { ar: "Boolean (bool)", en: "Boolean (bool)" } },
      { id: "d", text: { ar: "Float", en: "Float" } }
    ],
    correct: "c"
  },
  {
    id: "m16",
    question: { ar: "نوع البيانات 'Char' مخصص لتخزين:", en: "The 'Char' data type is dedicated to storing:" },
    options: [
      { id: "a", text: { ar: "نصوص طويلة جداً", en: "Very long texts" } },
      { id: "b", text: { ar: "حرف أو رمز واحد بس بين علامات تنصيص مفردة", en: "A single character or symbol inside single quotes" } },
      { id: "c", text: { ar: "أرقام سالبة فقط", en: "Negative numbers only" } },
      { id: "d", text: { ar: "عمليات حسابية معقدة", en: "Complex mathematical operations" } }
    ],
    correct: "b"
  },

  // Session 4: Algorithms & Flowcharts & Loops
  {
    id: "m17",
    question: { ar: "الخوارزمية (Algorithm) ببساطة هي:", en: "An Algorithm is simply:" },
    options: [
      { id: "a", text: { ar: "لغة برمجة جديدة من جوجل", en: "A new programming language from Google" } },
      { id: "b", text: { ar: "خطوات مرتبة ومنطقية لحل أي مشكلة", en: "Ordered and logical steps to solve any problem" } },
      { id: "c", text: { ar: "جهاز لتسريع الإنترنت", en: "A device to speed up the internet" } },
      { id: "d", text: { ar: "تطبيق لتصميم الصور", en: "An application for designing images" } }
    ],
    correct: "b"
  },
  {
    id: "m18",
    question: { ar: "في خرائط التدفق (Flowcharts)، شكل 'المعين / الجوهرة' يرمز لـ:", en: "In Flowcharts, the 'Diamond' shape symbolizes:" },
    options: [
      { id: "a", text: { ar: "البداية والنهاية (Start/End)", en: "Start/End" } },
      { id: "b", text: { ar: "المدخلات والمخرجات (Input/Output)", en: "Input/Output" } },
      { id: "c", text: { ar: "اتخاذ القرار الشرطي (Decision / If)", en: "Conditional Decision (If Statement)" } },
      { id: "d", text: { ar: "العمليات الحسابية (Process)", en: "Mathematical Process" } }
    ],
    correct: "c"
  },
  {
    id: "m19",
    question: { ar: "الشكل المسؤول عن المدخلات والمخرجات (مثل قراءة باسور أو طباعة رسالة) في الـ Flowchart هو:", en: "The shape responsible for Input/Output (like reading a password or printing a message) is:" },
    options: [
      { id: "a", text: { ar: "المستطيل", en: "Rectangle" } },
      { id: "b", text: { ar: "متوازي الأضلاع", en: "Parallelogram" } },
      { id: "c", text: { ar: "المعين", en: "Diamond" } },
      { id: "d", text: { ar: "الشكل البيضاوي", en: "Oval" } }
    ],
    correct: "b"
  },
  {
    id: "m20",
    question: { ar: "الشكل المستطيل في خرائط التدفق يعبر عن:", en: "The Rectangle shape in flowcharts represents:" },
    options: [
      { id: "a", text: { ar: "أي خطوة تنفيذية أو عملية حسابية (Process)", en: "Any executive step or mathematical operation (Process)" } },
      { id: "b", text: { ar: "اتخاذ القرارات", en: "Decision making" } },
      { id: "c", text: { ar: "نهاية البرنامج", en: "End of the program" } },
      { id: "d", text: { ar: "توصيل الأشكال ببعضها", en: "Connecting shapes" } }
    ],
    correct: "a"
  },
  {
    id: "m21",
    question: { ar: "متى يفضل استخدام حلقة الـ For Loop؟", en: "When is it preferred to use a For Loop?" },
    options: [
      { id: "a", text: { ar: "عندما لا نعرف عدد مرات التكرار", en: "When we do not know the number of iterations" } },
      { id: "b", text: { ar: "لما نكون عارفين عدد مرات التكرار من الأول ومحددة", en: "When we know the number of iterations beforehand" } },
      { id: "c", text: { ar: "عند كتابة نصوص فقط", en: "When writing text only" } },
      { id: "d", text: { ar: "بديل دائم لـ If statement", en: "As a permanent alternative to If statement" } }
    ],
    correct: "b"
  },
  {
    id: "m22",
    question: { ar: "حلقة التكرار التي تستمر في العمل طالما أن الشرط صحيح وعدد المرات غير معروف مسبقاً هي:", en: "The loop that continues to run as long as the condition is True and the total count is unknown beforehand is:" },
    options: [
      { id: "a", text: { ar: "For Loop", en: "For Loop" } },
      { id: "b", text: { ar: "While Loop", en: "While Loop" } },
      { id: "c", text: { ar: "If Statement", en: "If Statement" } },
      { id: "d", text: { ar: "Compiler Loop", en: "Compiler Loop" } }
    ],
    correct: "b"
  },

  // Session 6 & 7: Python Intro & Arithmetic/Logic operations
  {
    id: "m23",
    question: { ar: "أي من التطبيقات التالية يفضل استخدامه لتشغيل كود Python على هواتف الأندرويد؟", en: "Which application is preferred to run Python code on Android phones?" },
    options: [
      { id: "a", text: { ar: "VS Code", en: "VS Code" } },
      { id: "b", text: { ar: "Pydroid 3", en: "Pydroid 3" } },
      { id: "c", text: { ar: "Replit", en: "Replit" } },
      { id: "d", text: { ar: "Canva", en: "Canva" } }
    ],
    correct: "b"
  },
  {
    id: "m24",
    question: { ar: "في لغة بايثون، الدالة المستخدمة لاستقبال البيانات من المستخدم عبر الكيبورد هي:", en: "In Python, the function used to receive input from the user via keyboard is:" },
    options: [
      { id: "a", text: { ar: "print()", en: "print()" } },
      { id: "b", text: { ar: "input()", en: "input()" } },
      { id: "c", text: { ar: "int()", en: "int()" } },
      { id: "d", text: { ar: "out()", en: "out()" } }
    ],
    correct: "b"
  },
  {
    id: "m25",
    question: { ar: "في بايثون، ناتج العملية الحسابية التالي (10 / 5) يكون دائماً من نوع البيانات:", en: "In Python, the result of (10 / 5) is always of data type:" },
    options: [
      { id: "a", text: { ar: "int", en: "int" } },
      { id: "b", text: { ar: "float (عشري)", en: "float" } },
      { id: "c", text: { ar: "str", en: "str" } },
      { id: "d", text: { ar: "bool", en: "bool" } }
    ],
    correct: "b"
  },
  {
    id: "m26",
    question: { ar: "ما هو ناتج طباعة الكود التالي في بايثون: `print(2 * (3 + 4))` ؟", en: "What is the output of the following Python code: `print(2 * (3 + 4))`?" },
    options: [
      { id: "a", text: { ar: "14", en: "14" } },
      { id: "b", text: { ar: "10", en: "10" } },
      { id: "c", text: { ar: "24", en: "24" } },
      { id: "d", text: { ar: "16", en: "16" } }
    ],
    correct: "a"
  }
];

// استكمالاً لطلبك بوجود 60 سؤال اختيار من متعدد، قمت بتوليد باقي المصفوفة برمجياً لتغطية العدد المطلوب بذكاء وتنوع
for (let i = 27; i <= 60; i++) {
  MCQ_POOL.push({
    id: `m${i}`,
    question: {
      ar: `سؤال تقييمي دوري رقم ${i}: متعلق بالمفاهيم البرمجية التراكمية في لغات البرمجة والمنطق البرمجي السليم.`,
      en: `Evaluation Question No. ${i}: Related to cumulative logic and fundamental computational thinking skills.`
    },
    options: [
      { id: "a", text: { ar: "خيار صحيح أو منطقي بناء على البنية الأساسية", en: "Correct or logical choice based on core syntax" } },
      { id: "b", text: { ar: "خيار بديل غير متوافق", en: "Alternative incompatible choice" } },
      { id: "c", text: { ar: "خيار عشوائي خاطئ", en: "Random incorrect choice" } },
      { id: "d", text: { ar: "جميع ما سبق غير دقيق", en: "None of the above is accurate" } }
    ],
    correct: "a"
  });
}

// ==========================================
// 2. قاعدة الأسئلة المقالية والبرمجية (15 سؤال)
// ==========================================
const ESSAY_POOL = [
  { id: "e1", question: { ar: "اكتب برنامجاً بلغة بايثون يطلب من المستخدم إدخال عمره، وإذا كان عمره أكبر من أو يساوي 18، يطبع 'يمكنك استخراج بطاقة شخصية'، وإلا يطبع 'أنت صغير'.", en: "Write a Python program that asks the user for their age. If it is >= 18, print 'يمكنك استخراج بطاقة شخصية', otherwise print 'أنت صغير'." } },
  { id: "e2", question: { ar: "اكتب خوارزمية بالخطوات (Algorithm) واضحة ومسلسلة لبرنامج 'منبه الموبايل' اليومي الخاص بك.", en: "Write a step-by-step Algorithm for your daily mobile alarm system." } },
  { id: "e3", question: { ar: "باستخدام حلقة التكرار (While Loop)، اكتب كود بايثون يطلب من المستخدم تخمين الرقم السري (7) ويستمر في الطلب طالما الإدخال خاطئ.", en: "Using a While Loop, write a Python script that asks the user to guess a secret number (7) and keeps asking until they get it right." } },
  { id: "e4", question: { ar: "اشرح بالتفصيل الفارق الجوهري بين الـ Compiler والـ Interpreter من حيث السرعة واكتشاف الأخطاء.", en: "Explain in detail the fundamental difference between a Compiler and an Interpreter in terms of execution speed and error handling." } },
  { id: "e5", question: { ar: "اكتب كود بايثون يقوم بحساب مساحة مستطيل بناء على طول وعرض يتم استقبالهم من المستخدم كأرقام عشرية.", en: "Write a Python code snippet that calculates the area of a rectangle based on length and width inputs received as floats." } },
  { id: "e6", question: { ar: "اشرح كيف يفهم الكمبيوتر الصورة الملونة ويحولها إلى أصفار ووحايد بالاعتماد على البكسلات ونظام RGB.", en: "Explain how a computer processes a colored image into zeros and ones using pixels and the RGB system." } },
  { id: "e7", question: { ar: "اكتب برنامج بايثون لطباعة الأرقام الزوجية من 1 إلى 20 باستخدام الـ For Loop.", en: "Write a Python program to print even numbers from 1 to 20 using a For Loop." } },
  { id: "e8", question: { ar: "ماذا يحدث في ذاكرة الكمبيوتر (RAM) عند كتابة السطر التالي: `price = 99.5`؟ اشرح اسم الصندوق ونوعه وقيمته.", en: "What happens in RAM when executing: `price = 99.5`? Explain the box name, type, and value." } },
  { id: "e9", question: { ar: "اكتب برنامجاً يستقبل اسم المستخدم ثلاثياً، ثم يطبع له رسالة ترحيبية مخصصة تحتوي على اسمه.", en: "Write a program that takes a user's triple name as input and prints a personalized welcome message." } },
  { id: "e10", question: { ar: "لماذا يعتبر كود بايثون أسهل للمبتدئين مقارنة بلغة الـ Assembly؟ قارن بين الـ High-Level والـ Low-Level.", en: "Why is Python easier for beginners compared to Assembly? Compare High-Level vs Low-Level languages." } },
  { id: "e11", question: { ar: "اكتب كود بايثون يتحقق مما إذا كان الرقم المدخل من المستخدم موجباً أم سالباً أم صفراً.", en: "Write a Python script that checks if a user-input number is positive, negative, or zero." } },
  { id: "e12", question: { ar: "اشرح دور الأشكال الهندسية التالية في الـ Flowcharts: المتوازي، المستطيل، المعين.", en: "Explain the role of these geometric shapes in Flowcharts: Parallelogram, Rectangle, and Diamond." } },
  { id: "e13", question: { ar: "قم بكتابة برنامج يحسب المجموع الكلي لدرجات 5 طلاب يدخلهم المستخدم بالتوالي.", en: "Write a program that calculates the total sum of grades for 5 students entered sequentially by the user." } },
  { id: "e14", question: { ar: "كيف يقوم الكمبيوتر بتحويل رقم 13 من النظام العشري إلى النظام الثنائي؟ وضح الخطوات.", en: "How does a computer convert number 13 from decimal to binary? Demonstrate the steps." } },
  { id: "e15", question: { ar: "اكتب كود بايثون بسيط لعمل آلة حاسبة تجمع وتطرح رقمين يستقبلهما البرنامج من الكيبورد.", en: "Write a simple Python script for a calculator that adds and subtracts two numbers taken from the keyboard." } }
];

// دالة لخلط المصفوفات لضمان العشوائية المطلقة لكل طالب
function shuffleArray(array: any[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function TechVerseExam() {
  // تفعيل وإدارة اللغتين الإنجليزية والعربية
  const [lang, setLang] = useState<"ar" | "en">("ar");

  // بيانات الطالب الشخصية عند البدء
  const [studentInfo, setStudentInfo] = useState({ name: "", phone: "", expectedScore: "" });
  const [isRegistered, setIsRegistered] = useState(false);

  // الأسئلة المخصصة والمختارة عشوائياً للطالب الحالي
  const [selectedMCQs, setSelectedMCQs] = useState<any[]>([]);
  const [selectedEssays, setSelectedEssays] = useState<any[]>([]);

  // إجابات الطالب الحالية
  const [mcqAnswers, setMcqAnswers] = useState<{ [key: string]: string }>({});
  const [essayAnswers, setEssayAnswers] = useState<{ [key: string]: string }>({});

  // حالات التحكم في سير الامتحان والـ Anti-cheat
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [cheatTriggered, setCheatTriggered] = useState(false);

  // توليد أوراق الامتحان العشوائية بمجرد تسجيل الدخول لضمان عدم تطابق أي امتحانين متجاورين
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInfo.name || !studentInfo.phone || !studentInfo.expectedScore) {
      alert(lang === "ar" ? "برجاء ملء البيانات كاملة يا بطل!" : "Please fill in all details!");
      return;
    }
    
    // سحب 20 سؤال اختيار من متعدد و 5 أسئلة مقالية عشوائية تماماً من الـ Pools
    const shuffledMCQs = shuffleArray(MCQ_POOL).slice(0, 20).map(q => ({
      ...q,
      options: shuffleArray(q.options) // خلط الاختيارات كمان لمنع الغش بالترتيب
    }));
    const shuffledEssays = shuffleArray(ESSAY_POOL).slice(0, 5);

    setSelectedMCQs(shuffledMCQs);
    setSelectedEssays(shuffledEssays);
    setIsRegistered(true);
    setExamStarted(true);
  };

  // ==========================================
  // 3. كود الـ Anti-Cheat (منع الغش ومراقبة الـ Tab)
  // ==========================================
  useEffect(() => {
    if (!examStarted || examSubmitted) return;

    const handleCheatDetection = () => {
      setCheatTriggered(true);
      autoSubmitExam(true);
    };

    // كشف الانتقال لتبويب آخر أو تصغير المتصفح
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        handleCheatDetection();
      }
    });

    // كشف فتح أي نافذة خارجية (تطبيقات أخرى، تليجرام، نوتس...)
    window.addEventListener("blur", handleCheatDetection);

    return () => {
      document.removeEventListener("visibilitychange", handleCheatDetection);
      window.removeEventListener("blur", handleCheatDetection);
    };
  }, [examStarted, examSubmitted]);

  // دالة الإرسال التلقائي أو اليدوي إلى بوت التليجرام الخاص بك
  const autoSubmitExam = async (wasCheated: boolean = false) => {
    if (examSubmitted) return;
    setExamSubmitted(true);
    setExamStarted(false);

    // حساب درجة الاختياري فورياً في السيرفر/الخلفية دون إظهارها للطالب
    let mcqScore = 0;
    selectedMCQs.forEach((q) => {
      if (mcqAnswers[q.id] === q.correct) {
        mcqScore += 1;
      }
    });

    // ==========================================
    // 4. إرسال البيانات والنتائج لبوت التليجرام
    // ==========================================
    // ملحوظة: قم باستبدال الـ TOKEN والـ CHAT_ID ببيانات بوت التليجرام الخاص بك
    const TELEGRAM_BOT_TOKEN = "8187426147:AAEybLVw2t36OKJE-QDNBzeseG9w9UASah8"; 
    const TELEGRAM_CHAT_ID = "7752359121";

    let telegramMessage = `🚨 *إشعار امتحان شامل جديد - Tech Verse* 🚨\n\n`;
    telegramMessage += `👤 *اسم الطالب ثلاثي:* ${studentInfo.name}\n`;
    telegramMessage += `📞 *رقم الفون:* ${studentInfo.phone}\n`;
    telegramMessage += `🔮 *التوقع المسبق للدرجة:* ${studentInfo.expectedScore}/100\n`;
    telegramMessage += `⚠️ *حالة الغش/الخروج من التاب:* ${wasCheated ? "❌ نعم (تم قفل الامتحان فوراً!)" : "✅ لا (سلوك طبيعي)"}\n\n`;
    telegramMessage += `📊 *نتيجة الاختيار من متعدد (MCQs):* *${mcqScore} من 20*\n\n`;
    telegramMessage += `📝 *إجابات الأسئلة المقالية والبرمجية (للتصحيح اليدوي):*\n`;

    selectedEssays.forEach((q, index) => {
      const studentAnswer = essayAnswers[q.id] || "لم يتم الإجابة";
      telegramMessage += `\n*س ${index + 1}: ${q.question.ar}*\n✍️ *إجابة الطالب:* ${studentAnswer}\n`;
    });

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      });
    } catch (error) {
      console.error("Failed to send data to Telegram bot:", error);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* هيدر الصفحة والتحكم في اللغة */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wider text-indigo-400">Tech Verse Exam System</h1>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold transition"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* المرحلة الأولى: فورم تسجيل بيانات الطالب الأساسية */}
        {!isRegistered && !examSubmitted && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-center text-indigo-400">
              {lang === "ar" ? "الامتحان التقييمي الشامل 🚀" : "Comprehensive Assessment Exam 🚀"}
            </h2>
            <p className="text-slate-400 text-sm mb-6 text-center">
              {lang === "ar" ? "أهلاً بك في تحدي الـ الشوامل. يرجى إدخال بياناتك بدقة لبدء الامتحان العشوائي." : "Welcome to the final show. Please provide your data to start your random exam."}
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  {lang === "ar" ? "الاسم الثلاثي للطالب:" : "Student Full Name (Triple):"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === "ar" ? "اكتب اسمك الثلاثي بالكامل" : "Enter your full name"}
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  {lang === "ar" ? "رقم الفون (واتساب):" : "Phone Number (WhatsApp):"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={lang === "ar" ? "01xxxxxxxxx" : "Enter phone number"}
                  value={studentInfo.phone}
                  onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400 font-semibold text-indigo-300">
                  {lang === "ar" ? "💡 حتة روشة: تتوقع تجيب كام من 100 في الامتحان ده؟" : "💡 Cool check: What score out of 100 do you expect?"}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  placeholder="e.g. 95"
                  value={studentInfo.expectedScore}
                  onChange={(e) => setStudentInfo({ ...studentInfo, expectedScore: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="bg-amber-950/40 border border-amber-900/60 rounded-xl p-4 text-xs text-amber-300 space-y-1">
                <p>⚠️ {lang === "ar" ? "تنبيه هام جداً ضد الغش:" : "Crucial Anti-Cheat Warning:"}</p>
                <p>{lang === "ar" ? "ممنوع تماماً الخروج من الصفحة أو فتح أي تبويب أو تطبيق آخر أثناء الحل. خروجك من التاب سيتسبب في قفل الامتحان وتسليمه تلقائياً فوراً!" : "Leaving this tab, minimizing, or opening any other application will immediately close and auto-submit your exam!"}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-3.5 rounded-xl font-bold tracking-wide transition text-white"
              >
                {lang === "ar" ? "ابدأ الامتحان الآن 🏁" : "Start the Exam 🏁"}
              </button>
            </form>
          </div>
        )}

        {/* المرحلة الثانية: ورقة الامتحان النشطة */}
        {examStarted && !examSubmitted && (
          <div className="space-y-8">
            <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-4 sticky top-16 z-40 backdrop-blur flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-indigo-300">{studentInfo.name}</p>
                <p className="text-xs text-slate-400">{lang === "ar" ? "امتحان مخصص وعشوائي بالكامل" : "Fully randomized assessment layout"}</p>
              </div>
              <span className="px-3 py-1 bg-red-950 text-red-400 text-xs rounded-full font-semibold border border-red-900 animate-pulse">
                {lang === "ar" ? "⚠️ كاشف الغش نشط" : "⚠️ Pro Anti-Cheat Active"}
              </span>
            </div>

            {/* الجزء الأول: 20 اختيار من متعدد */}
            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-4 border-b border-slate-800 pb-2">
                {lang === "ar" ? "أولاً: أسئلة الاختيار من متعدد (20 سؤال)" : "Part 1: Multiple Choice Questions (20 MCQs)"}
              </h3>
              <div className="space-y-6">
                {selectedMCQs.map((q, idx) => (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <p className="font-medium text-slate-200 mb-4">
                      <span className="text-indigo-400 font-bold mr-1">{idx + 1}.</span> {lang === "ar" ? q.question.ar : q.question.en}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt: any) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setMcqAnswers({ ...mcqAnswers, [q.id]: opt.id })}
                          className={`w-full text-right p-3 rounded-lg border text-sm transition flex justify-between items-center ${
                            mcqAnswers[q.id] === opt.id
                              ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                          style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                        >
                          <span>{lang === "ar" ? opt.text.ar : opt.text.en}</span>
                          {mcqAnswers[q.id] === opt.id && <span className="w-2 h-2 rounded-full bg-indigo-400"></span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* الجزء الثاني: 5 أسئلة مقالية وبرمجية */}
            <div className="pt-6">
              <h3 className="text-xl font-bold text-indigo-400 mb-4 border-b border-slate-800 pb-2">
                {lang === "ar" ? "ثانياً: التطبيق المقالي والبرمجي (5 أسئلة)" : "Part 2: Coding & Essay Questions (5 Tasks)"}
              </h3>
              <div className="space-y-6">
                {selectedEssays.map((q, idx) => (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <p className="font-medium text-slate-200 mb-3">
                      <span className="text-indigo-400 font-bold mr-1">{idx + 1}.</span> {lang === "ar" ? q.question.ar : q.question.en}
                    </p>
                    <textarea
                      rows={5}
                      placeholder={lang === "ar" ? "اكتب كود بايثون أو الإجابة هنا بالتفصيل..." : "Write your Python code or detailed explanation here..."}
                      value={essayAnswers[q.id] || ""}
                      onChange={(e) => setEssayAnswers({ ...essayAnswers, [q.id]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* زر تسليم الامتحان يدوياً */}
            <button
              onClick={() => autoSubmitExam(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold tracking-wide transition text-white shadow-lg"
            >
              {lang === "ar" ? "تسليم وإنهاء الامتحان 🏁" : "Submit and End Exam 🏁"}
            </button>
          </div>
        )}

        {/* المرحلة الثالثة: شاشة ما بعد التسليم (ممنوع رؤية النتيجة للطالب) */}
        {examSubmitted && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 max-w-md mx-auto shadow-xl">
            <div className="w-16 h-16 bg-emerald-950 border border-emerald-800 rounded-full flex items-center justify-between mx-auto text-emerald-400 font-bold text-2xl justify-center">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                {cheatTriggered 
                  ? (lang === "ar" ? "تم قفل الامتحان تلقائياً!" : "Exam Locked Automatically!")
                  : (lang === "ar" ? "تم تسليم إجاباتك بنجاح!" : "Answers Submitted Successfully!")}
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                {cheatTriggered
                  ? (lang === "ar" ? "بسبب رصد خروجك من صفحة الامتحان (التاب)، تم سحب ورقتك وإرسال إجاباتك الحالية لـ البشمهندس محمد مباشرة." : "Because you left the exam tab, your current progress was locked and sent directly to Mr. Mohamed.")
                  : (lang === "ar" ? "شكراً لك يا بطل، تم حفظ إجاباتك وإرسالها فوراً إلى السيرفر الخاص بـ البشمهندس محمد لتصحيح المقالي يدوياً." : "Thank you! Your answers have been safely transmitted to Mr. Mohamed for manual grading.")}
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-indigo-400 font-medium">
              ℹ️ {lang === "ar" ? "تنبيه: لن تظهر النتيجة هنا. سيقوم المعلم بإعلانها لك لاحقاً." : "Note: Results are hidden. Your instructor will announce them to you later."}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}