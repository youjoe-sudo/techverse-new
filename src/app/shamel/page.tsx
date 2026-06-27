"use client";

import React, { useState, useEffect, useRef } from "react";

// ==========================================
// قاعدة البيانات الشاملة: 60 سؤال اختيار من متعدد حقيقي ومطابق للسيشنز
// ==========================================
const MCQ_POOL = [
  // 1-10: Binary, Transistors, ASCII, Pixels
  {
    id: "m1",
    question: { ar: "ما هو النظام الذي يعتمد عليه الكمبيوتر داخلياً لفهم كافة البيانات؟", en: "What system does the computer rely on internally to understand all data?" },
    options: [
      { id: "a", text: { ar: "النظام العشري (Decimal)", en: "Decimal System" } },
      { id: "b", text: { ar: "النظام الثنائي (Binary)", en: "Binary System" } },
      { id: "c", text: { ar: "نظام الحروف (ASCII)", en: "ASCII System" } },
      { id: "d", text: { ar: "نظام الألوان (RGB)", en: "RGB System" } }
    ],
    correct: "b"
  },
  {
    id: "m2",
    question: { ar: "المفاتيح الكهربائية الصغيرة جداً داخل المعالج (CPU) تسمى:", en: "The tiny electrical switches inside the processor (CPU) are called:" },
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
    question: { ar: "تمثل الحالة (1) في المفتاح الكهربائي للكمبيوتر أن:", en: "The state (1) in a computer's electrical switch means:" },
    options: [
      { id: "a", text: { ar: "المفتاح مغلق والكهرباء مارة (On)", en: "The switch is closed and electricity flows (On)" } },
      { id: "b", text: { ar: "المفتاح مفتوح ولا توجد كهرباء (Off)", en: "The switch is open and no electricity flows (Off)" } },
      { id: "c", text: { ar: "المفتاح تم حذفه", en: "The switch is deleted" } },
      { id: "d", text: { ar: "المفتاح فارغ", en: "The switch is empty" } }
    ],
    correct: "a"
  },
  {
    id: "m5",
    question: { ar: "كيف يُكتب الرقم 5 بالنظام الثنائي (Binary)؟", en: "How is the number 5 written in Binary?" },
    options: [
      { id: "a", text: { ar: "101", en: "101" } },
      { id: "b", text: { ar: "011", en: "011" } },
      { id: "c", text: { ar: "111", en: "111" } },
      { id: "d", text: { ar: "010", en: "010" } }
    ],
    correct: "a"
  },
  {
    id: "m6",
    question: { ar: "كيف يُكتب الرقم 4 بالنظام الثنائي (Binary)؟", en: "How is the number 4 written in Binary?" },
    options: [
      { id: "a", text: { ar: "011", en: "011" } },
      { id: "b", text: { ar: "100", en: "100" } },
      { id: "c", text: { ar: "110", en: "110" } },
      { id: "d", text: { ar: "001", en: "001" } }
    ],
    correct: "b"
  },
  {
    id: "m7",
    question: { ar: "الجدول العالمي الذي يعطي لكل حرف أو رمز رقماً خاصاً ليفهمه الكمبيوتر هو:", en: "The global table that maps each character or symbol to a unique number for computers is:" },
    options: [
      { id: "a", text: { ar: "جدول الألوان", en: "Color Table" } },
      { id: "b", text: { ar: "جدول الـ Flowchart", en: "Flowchart Table" } },
      { id: "c", text: { ar: "جدول الـ ASCII", en: "ASCII Table" } },
      { id: "d", text: { ar: "جدول بايثون", en: "Python Table" } }
    ],
    correct: "c"
  },
  {
    id: "m8",
    question: { ar: "في جدول ASCII المشهور، حرف 'A' الكبير يقابله الرقم العشري:", en: "In the ASCII table, the capital letter 'A' corresponds to the decimal number:" },
    options: [
      { id: "a", text: { ar: "97", en: "97" } },
      { id: "b", text: { ar: "65", en: "65" } },
      { id: "c", text: { ar: "48", en: "48" } },
      { id: "d", text: { ar: "100", en: "100" } }
    ],
    correct: "b"
  },
  {
    id: "m9",
    question: { ar: "الصورة على شاشة الكمبيوتر تتكون من نقط صغيرة جداً تسمى:", en: "An image on a computer screen consists of tiny dots called:" },
    options: [
      { id: "a", text: { ar: "الترانزستورات", en: "Transistors" } },
      { id: "b", text: { ar: "البكسلات (Pixels)", en: "Pixels" } },
      { id: "c", text: { ar: "الأكواد النصية", en: "Text Codes" } },
      { id: "d", text: { ar: "المترجمات", en: "Compilers" } }
    ],
    correct: "b"
  },
  {
    id: "m10",
    question: { ar: "نظام RGB الملون في الشاشات يعتمد على خلط ثلاثة ألوان هي:", en: "The RGB system in screens relies on mixing three colors:" },
    options: [
      { id: "a", text: { ar: "أحمر، أصفر، أزرق", en: "Red, Yellow, Blue" } },
      { id: "b", text: { ar: "أحمر، أخضر، أسود", en: "Red, Green, Black" } },
      { id: "c", text: { ar: "أحمر، أخضر، أزرق", en: "Red, Green, Blue" } },
      { id: "d", text: { ar: "أبيض، أسود، رمادي", en: "White, Black, Gray" } }
    ],
    correct: "c"
  },

  // 11-20: Compilers, Interpreters, High/Low Level
  {
    id: "m11",
    question: { ar: "البرنامج المترجم الذي يقرأ الكود بالكامل مرة واحدة ويخرجه في ملف تشغيلي (exe) هو:", en: "The translator that reads the whole code at once and outputs an executable file (.exe) is:" },
    options: [
      { id: "a", text: { ar: "Interpreter", en: "Interpreter" } },
      { id: "b", text: { ar: "Compiler", en: "Compiler" } },
      { id: "c", text: { ar: "Variable", en: "Variable" } },
      { id: "d", text: { ar: "Flowchart", en: "Flowchart" } }
    ],
    correct: "b"
  },
  {
    id: "m12",
    question: { ar: "المترجم الذي يقرأ الكود سطر بسطر وينفذه فوراً ويقف عند أول غلطة هو:", en: "The translator that reads the code line by line, executes it, and stops at the first error is:" },
    options: [
      { id: "a", text: { ar: "Compiler", en: "Compiler" } },
      { id: "b", text: { ar: "Interpreter", en: "Interpreter" } },
      { id: "c", text: { ar: "CPU", en: "CPU" } },
      { id: "d", text: { ar: "RAM", en: "RAM" } }
    ],
    correct: "b"
  },
  {
    id: "m13",
    question: { ar: "أي من أنواع المترجمات يعتبر أسرع بكثير وقت تشغيل البرنامج النهائي؟", en: "Which type of translators is much faster at final runtime execution?" },
    options: [
      { id: "a", text: { ar: "Compiler", en: "Compiler" } },
      { id: "b", text: { ar: "Interpreter", en: "Interpreter" } },
      { id: "c", text: { ar: "المترجمان بنفس السرعة", en: "Both are the same speed" } },
      { id: "d", text: { ar: "لا يوجد مترجم سريع", en: "No translator is fast" } }
    ],
    correct: "a"
  },
  {
    id: "m14",
    question: { ar: "لغات البرمجة القريبة من فهم البشر وسهلة القراءة والتعلم تسمى:", en: "Programming languages close to human understanding and easy to read are called:" },
    options: [
      { id: "a", text: { ar: "Low-Level Languages", en: "Low-Level Languages" } },
      { id: "b", text: { ar: "High-Level Languages", en: "High-Level Languages" } },
      { id: "c", text: { ar: "Machine Languages", en: "Machine Languages" } },
      { id: "d", text: { ar: "Binary Languages", en: "Binary Languages" } }
    ],
    correct: "b"
  },
  {
    id: "m15",
    question: { ar: "لغات البرمجة المعقدة والقريبة جداً من عتاد الجهاز (Hardware) تسمى:", en: "Complex programming languages that are very close to the hardware are called:" },
    options: [
      { id: "a", text: { ar: "High-Level Languages", en: "High-Level Languages" } },
      { id: "b", text: { ar: "Low-Level Languages", en: "Low-Level Languages" } },
      { id: "c", text: { ar: "لغات التصميم", en: "Design Languages" } },
      { id: "d", text: { ar: "لغات الويب", en: "Web Languages" } }
    ],
    correct: "b"
  },
  {
    id: "m16",
    question: { ar: "تعتبر لغة التجميع (Assembly) مثالاً على لغات الـ:", en: "Assembly language is an example of:" },
    options: [
      { id: "a", text: { ar: "High-Level Languages", en: "High-Level Languages" } },
      { id: "b", text: { ar: "Low-Level Languages", en: "Low-Level Languages" } },
      { id: "c", text: { ar: "تطوير الويب السريع", en: "Fast Web Development" } },
      { id: "d", text: { ar: "الذكاء الاصطناعي", en: "Artificial Intelligence" } }
    ],
    correct: "b"
  },
  {
    id: "m17",
    question: { ar: "لغات مثل Python و Java تعتبر من لغات الـ:", en: "Languages like Python and Java are considered:" },
    options: [
      { id: "a", text: { ar: "Low-Level Languages", en: "Low-Level Languages" } },
      { id: "b", text: { ar: "High-Level Languages", en: "High-Level Languages" } },
      { id: "c", text: { ar: "لغات الآلة المباشرة", en: "Direct Machine Languages" } },
      { id: "d", text: { ar: "أنظمة التشغيل", en: "Operating Systems" } }
    ],
    correct: "b"
  },
  {
    id: "m18",
    question: { ar: "وظيفة المترجم (Translator) الأساسية في البرمجة هي تحويل الكود إلى:", en: "The main function of a translator in programming is to convert code into:" },
    options: [
      { id: "a", text: { ar: "ملفات نصية ملوّنة", en: "Colored text files" } },
      { id: "b", text: { ar: "أوامر يفهمها الكمبيوتر (أصفار ووحايد)", en: "Instructions understood by computers (zeros and ones)" } },
      { id: "c", text: { ar: "صفحات ويب سريعة", en: "Fast web pages" } },
      { id: "d", text: { ar: "صور عالية الجودة", en: "High quality images" } }
    ],
    correct: "b"
  },
  {
    id: "m19",
    question: { ar: "أي المترجمات يعتبر أسهل وأفضل أثناء فترة تطوير وتجربة الكود؟", en: "Which translator type is easier and better during code development and testing?" },
    options: [
      { id: "a", text: { ar: "Compiler", en: "Compiler" } },
      { id: "b", text: { ar: "Interpreter", en: "Interpreter" } },
      { id: "c", text: { ar: "الـ Hardware", en: "The Hardware" } },
      { id: "d", text: { ar: "النظام العشري", en: "Decimal System" } }
    ],
    correct: "b"
  },
  {
    id: "m20",
    question: { ar: "الكمبيوتر يفهم اللغات العالية المستوى (High-Level) عن طريق:", en: "The computer understands High-Level languages through:" },
    options: [
      { id: "a", text: { ar: "فهم الكلمات الإنجليزية مباشرة", en: "Understanding English words directly" } },
      { id: "b", text: { ar: "برنامج وسيط يسمى المترجم", en: "An intermediate program called a translator" } },
      { id: "c", text: { ar: "لوحة المفاتيح", en: "The keyboard" } },
      { id: "d", text: { ar: "شاشة العرض", en: "The display screen" } }
    ],
    correct: "b"
  },

  // 21-30: Variables & Data Types
  {
    id: "m21",
    question: { ar: "المتغير (Variable) في البرمجة هو عبارة عن:", en: "A Variable in programming is structurally:" },
    options: [
      { id: "a", text: { ar: "ملف على الهارد ديسك", en: "A file on the hard drive" } },
      { id: "b", text: { ar: "صندوق محجوز في الذاكرة (RAM) له اسم وقيمة", en: "A box reserved in RAM with a name and a value" } },
      { id: "c", text: { ar: "شاشة استقبال الأوامر", en: "An input commands screen" } },
      { id: "d", text: { ar: "أداة لتسريع المعالج", en: "A tool to speed up CPU" } }
    ],
    correct: "b"
  },
  {
    id: "m22",
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
    id: "m23",
    question: { ar: "لتخزين الأرقام التي تحتوي على علامة عشرية (كسور) نستخدم نوع:", en: "To store numbers that contain a decimal point, we use:" },
    options: [
      { id: "a", text: { ar: "int", en: "int" } },
      { id: "b", text: { ar: "Float / Double", en: "Float / Double" } },
      { id: "c", text: { ar: "String", en: "String" } },
      { id: "d", text: { ar: "Char", en: "Char" } }
    ],
    correct: "b"
  },
  {
    id: "m24",
    question: { ar: "نوع البيانات المخصص لتخزين النصوص والكلمات الطويلة هو:", en: "The data type dedicated to storing long texts and strings is:" },
    options: [
      { id: "a", text: { ar: "Char", en: "Char" } },
      { id: "b", text: { ar: "String (str)", en: "String (str)" } },
      { id: "c", text: { ar: "Integer", en: "Integer" } },
      { id: "d", text: { ar: "Boolean", en: "Boolean" } }
    ],
    correct: "b"
  },
  {
    id: "m25",
    question: { ar: "نوع البيانات الذي يشيل حرف واحد أو رمز واحد بس هو:", en: "The data type that holds a single character or symbol only is:" },
    options: [
      { id: "a", text: { ar: "String", en: "String" } },
      { id: "b", text: { ar: "Char", en: "Char" } },
      { id: "c", text: { ar: "Float", en: "Float" } },
      { id: "d", text: { ar: "Boolean", en: "Boolean" } }
    ],
    correct: "b"
  },
  {
    id: "m26",
    question: { ar: "نوع البيانات المنطقي الذي لا يحتمل إلا قيمتين فقط (True أو False) هو:", en: "The logical data type that only holds two values (True or False) is:" },
    options: [
      { id: "a", text: { ar: "Integer", en: "Integer" } },
      { id: "b", text: { ar: "Boolean (bool)", en: "Boolean (bool)" } },
      { id: "c", text: { ar: "Float", en: "Float" } },
      { id: "d", text: { ar: "String", en: "String" } }
    ],
    correct: "b"
  },
  {
    id: "m27",
    question: { ar: "عند كتابة `price = 99.5` في بايثون، ما هو نوع المتغير تلقائياً؟", en: "When writing `price = 99.5` in Python, what is the variable type automatically?" },
    options: [
      { id: "a", text: { ar: "int", en: "int" } },
      { id: "b", text: { ar: "float", en: "float" } },
      { id: "c", text: { ar: "str", en: "str" } },
      { id: "d", text: { ar: "bool", en: "bool" } }
    ],
    correct: "b"
  },
  {
    id: "m28",
    question: { ar: "القيم النصية (String) يجب أن تكتب دائماً بين:", en: "String values must always be written inside:" },
    options: [
      { id: "a", text: { ar: "أقواس مربعة [ ]", en: "Square brackets [ ]" } },
      { id: "b", text: { ar: "علامات تنصيص \" \" أو ' '", en: "Quotes \" \" or ' '" } },
      { id: "c", text: { ar: "علامات أكبر وأصغر < >", en: "Angle brackets < >" } },
      { id: "d", text: { ar: "بدون علامات خالص", en: "Without any marks" } }
    ],
    correct: "b"
  },
  {
    id: "m29",
    question: { ar: "لماذا يحتاج الكمبيوتر لتحديد نوع البيانات (Data Type) للمتغير؟", en: "Why does the computer need to determine the variable data type?" },
    options: [
      { id: "a", text: { ar: "عشان يعرف يديك المساحة الصح في الذاكرة", en: "To reserve the correct space in RAM" } },
      { id: "b", text: { ar: "عشان يغير لون الكود", en: "To change code formatting colors" } },
      { id: "c", text: { ar: "لتسريع سرعة المروحة", en: "To speed up CPU cooling fan" } },
      { id: "d", text: { ar: "ليس له أي فائدة", en: "It has no purpose" } }
    ],
    correct: "a"
  },
  {
    id: "m30",
    question: { ar: "ANY مما يلي يعتبر قيمة صحيحة لمتغير من النوع Boolean؟", en: "Which of the following is a valid value for a Boolean variable?" },
    options: [
      { id: "a", text: { ar: "\"True\"", en: "\"True\"" } },
      { id: "b", text: { ar: "True", en: "True" } },
      { id: "c", text: { ar: "15.5", en: "15.5" } },
      { id: "d", text: { ar: "'T'", en: "'T'" } }
    ],
    correct: "b"
  },

  // 31-40: Algorithms & Flowcharts
  {
    id: "m31",
    question: { ar: "الخوارزمية (Algorithm) ببساطة هي:", en: "An Algorithm is simply:" },
    options: [
      { id: "a", text: { ar: "شكل هندسي دائري", en: "A circular geometric shape" } },
      { id: "b", text: { ar: "خطوات مرتبة ومنطقية لحل أي مشكلة", en: "Ordered and logical steps to solve any problem" } },
      { id: "c", text: { ar: "جهاز مودم للإنترنت", en: "An internet modem device" } },
      { id: "d", text: { ar: "نوع من المتغيرات", en: "A type of variables" } }
    ],
    correct: "b"
  },
  {
    id: "m32",
    question: { ar: "خرائط التدفق (Flowcharts) هي عبارة عن:", en: "Flowcharts are defined as:" },
    options: [
      { id: "a", text: { ar: "أكواد برمجية معقدة", en: "Complex programming codes" } },
      { id: "b", text: { ar: "رسمة بخطة هندسية لتوضيح تفكيرك قبل الكود", en: "A diagram drawing your plan and logic before coding" } },
      { id: "c", text: { ar: "جداول أرقام بايناري", en: "Binary number sheets" } },
      { id: "d", text: { ar: "تطبيق لتعديل الصور", en: "An image editing application" } }
    ],
    correct: "b"
  },
  {
    id: "m33",
    question: { ar: "في الـ Flowchart، يرمز الشكل البيضاوي (Oval) لـ:", en: "In Flowcharts, the Oval shape symbolizes:" },
    options: [
      { id: "a", text: { ar: "العمليات الحسابية", en: "Mathematical Processes" } },
      { id: "b", text: { ar: "البداية والنهاية (Start/End)", en: "Start/End" } },
      { id: "c", text: { ar: "المدخلات والمخرجات", en: "Inputs and Outputs" } },
      { id: "d", text: { ar: "اتخاذ القرار الشرطي", en: "Conditional Decisions" } }
    ],
    correct: "b"
  },
  {
    id: "m34",
    question: { ar: "الشكل المسؤول عن المدخلات والمخرجات (مثل إدخال باسور) هو:", en: "The shape responsible for Input/Output (like entering a password) is:" },
    options: [
      { id: "a", text: { ar: "المستطيل", en: "Rectangle" } },
      { id: "b", text: { ar: "متوازي الأضلاع (Parallelogram)", en: "Parallelogram" } },
      { id: "c", text: { ar: "المعين", en: "Diamond" } },
      { id: "d", text: { ar: "الشكل البيضاوي", en: "Oval" } }
    ],
    correct: "b"
  },
  {
    id: "m35",
    question: { ar: "في الـ Flowcharts، يرمز شكل المستطيل (Rectangle) لـ:", en: "In Flowcharts, the Rectangle shape represents:" },
    options: [
      { id: "a", text: { ar: "اتخاذ القرارات", en: "Decision making" } },
      { id: "b", text: { ar: "أي خطوة تنفيذية أو عملية حسابية (Process)", en: "Any executive step or mathematical operation (Process)" } },
      { id: "c", text: { ar: "بداية البرنامج فقط", en: "Program start only" } },
      { id: "d", text: { ar: "طباعة النصوص فقط", en: "Printing text only" } }
    ],
    correct: "b"
  },
  {
    id: "m36",
    question: { ar: "شكل المعين أو الجوهرة (Diamond) في خرائط التدفق يرمز لـ:", en: "The Diamond shape in flowcharts symbolizes:" },
    options: [
      { id: "a", text: { ar: "المدخلات والمخرجات", en: "Inputs and Outputs" } },
      { id: "b", text: { ar: "اتخاذ القرار الشرطي (Decision / If)", en: "Conditional Decision (If Statement)" } },
      { id: "c", text: { ar: "نهاية البرنامج", en: "Program end" } },
      { id: "d", text: { ar: "حساب المساحة", en: "Calculating Area" } }
    ],
    correct: "b"
  },
  {
    id: "m37",
    question: { ar: "جملة الـ If Statements تستخدم في البرمجة من أجل:", en: "The If Statements are used in programming for:" },
    options: [
      { id: "a", text: { ar: "تكرار الكود للأبد", en: "Repeating code forever" } },
      { id: "b", text: { ar: "اتخاذ القرار بناءً على شرط معين", en: "Decision making based on a specific condition" } },
      { id: "c", text: { ar: "حجز متغير نصي", en: "Reserving a string variable" } },
      { id: "d", text: { ar: "تعريف المترجم الفوري", en: "Defining the Interpreter" } }
    ],
    correct: "b"
  },
  {
    id: "m38",
    question: { ar: "ماذا يحدث لو قمنا بتبديل خطوات خوارزمية مرتبة منطقياً؟", en: "What happens if we switch the steps of a logically ordered algorithm?" },
    options: [
      { id: "a", text: { ar: "البرنامج يعمل أسرع", en: "The program runs faster" } },
      { id: "b", text: { ar: "البرنامج يبوظ ولا يعطي النتيجة الصحيحة", en: "The program fails and gives wrong results" } },
      { id: "c", text: { ar: "يتغير نوع المترجم تلقائياً", en: "The translator type changes automatically" } },
      { id: "d", text: { ar: "لا يحدث أي شيء", en: "Nothing happens" } }
    ],
    correct: "b"
  },
  {
    id: "m39",
    question: { ar: "في نظام تسجيل الدخول الشرطي، إذا كان الباسورد خاطئ (False) يوجهنا المعين لـ:", en: "In a login system flowchart, if the password is wrong (False), the Diamond routes us to:" },
    options: [
      { id: "a", text: { ar: "رسالة ترحيب Welcome", en: "Welcome message" } },
      { id: "b", text: { ar: "رسالة خطأ Wrong Password جرب تاني", en: "Error message (Wrong Password try again)" } },
      { id: "c", text: { ar: "إنهاء اللعبة مباشرة", en: "Ending the game directly" } },
      { id: "d", text: { ar: "بداية الـ Loop", en: "The start of the Loop" } }
    ],
    correct: "b"
  },
  {
    id: "m40",
    question: { ar: "المبرمج الشاطر والذكي يقوم برسم الـ Flowchart:", en: "A smart and skilled programmer draws the Flowchart:" },
    options: [
      { id: "a", text: { ar: "بعد إنهاء المشروع تماماً", en: "After finishing the project entirely" } },
      { id: "b", text: { ar: "قبل البدء في كتابة الأكواد كخريطة طريق له", en: "Before starting to code as a roadmap for him" } },
      { id: "c", text: { ar: "أثناء تسليم العميل فقط", en: "Only during delivery to the client" } },
      { id: "d", text: { ar: "لا يرسمه أبداً", en: "Never draws it" } }
    ],
    correct: "b"
  },

  // 41-50: Loops (For & While)
  {
    id: "m41",
    question: { ar: "حلقات التكرار (Loops) تستخدم في البرمجة بهدف:", en: "Loops are used in programming to:" },
    options: [
      { id: "a", text: { ar: "تغيير قيم المتغيرات النصية", en: "Change string variable values" } },
      { id: "b", text: { ar: "تكرار تنفيذ كود معين بدلاً من إعادة كتابته", en: "Repeat executing a block of code instead of rewriting it" } },
      { id: "c", text: { ar: "ترجمة كود بايثون إلى جافا", en: "Translate Python code to Java" } },
      { id: "d", text: { ar: "إيقاف الـ Hardware عن العمل", en: "Stop the Hardware from working" } }
    ],
    correct: "b"
  },
  {
    id: "m42",
    question: { ar: "متى نفضل استخدام حلقة التكرار من النوع For Loop؟", en: "When is it preferred to use a For Loop?" },
    options: [
      { id: "a", text: { ar: "عندما لا نعرف عدد مرات التكرار", en: "When we don't know the number of iterations" } },
      { id: "b", text: { ar: "لما نكون عارفين عدد مرات التكرار من الأول ومحددة", en: "When we know the number of iterations beforehand and it is fixed" } },
      { id: "c", text: { ar: "بديل دائم لـ الـ Compiler", en: "As a permanent alternative to Compilers" } },
      { id: "d", text: { ar: "عند التعامل مع الكسور فقط", en: "When dealing with floats only" } }
    ],
    correct: "b"
  },
  {
    id: "m43",
    question: { ar: "متى نستخدم حلقة التكرار من النوع While Loop؟", en: "When do we use a While Loop?" },
    options: [
      { id: "a", text: { ar: "لما نكون عارفين عدد المرات بالضبط من الأول", en: "When we know the exact number of iterations beforehand" } },
      { id: "b", text: { ar: "لما نكون عارفين الشرط بس، وعدد المرات مش معروف مسبقاً", en: "When we only know the condition, and the total count is unknown" } },
      { id: "c", text: { ar: "لطباعة سطر واحد فقط", en: "To print one line only" } },
      { id: "d", text: { ar: "لحجز مساحة في الـ RAM", en: "To reserve a space in RAM" } }
    ],
    correct: "b"
  },
  {
    id: "m44",
    question: { ar: "إذا كان عندك 10 طلاب وعايز تدخل درجاتهم بالتوالي، اللوب الأنسب هي:", en: "If you have 10 students and want to enter their grades, the best loop is:" },
    options: [
      { id: "a", text: { ar: "While Loop", en: "While Loop" } },
      { id: "b", text: { ar: "For Loop", en: "For Loop" } },
      { id: "c", text: { ar: "If Statement", en: "If Statement" } },
      { id: "d", text: { ar: "ASCII Loop", en: "ASCII Loop" } }
    ],
    correct: "b"
  },
  {
    id: "m45",
    question: { ar: "لعبة الثعبان تتحرك طالما اللعبة شغالة والمستخدم مخسرش، الأنسب هنا:", en: "The snake game moves as long as it is active and the user hasn't lost, the best fit is:" },
    options: [
      { id: "a", text: { ar: "For Loop", en: "For Loop" } },
      { id: "b", text: { ar: "While Loop", en: "While Loop" } },
      { id: "c", text: { ar: "المستطيل", en: "Rectangle" } },
      { id: "d", text: { ar: "البايناري", en: "Binary" } }
    ],
    correct: "b"
  },
  {
    id: "m46",
    question: { ar: "في برنامج تخمين الرقم السري، نظل نطلب الرقم 'طالما' الإدخال خاطئ باستخدام:", en: "In a secret number guessing game, we keep asking 'while' the input is wrong using:" },
    options: [
      { id: "a", text: { ar: "For Loop", en: "For Loop" } },
      { id: "b", text: { ar: "While Loop", en: "While Loop" } },
      { id: "c", text: { ar: "النوع float", en: "The type float" } },
      { id: "d", text: { ar: "جدول الـ ASCII", en: "ASCII Table" } }
    ],
    correct: "b"
  },
  {
    id: "m47",
    question: { ar: "الكلمة المحجوزة المستخدمة لكسر حلقة التكرار والخروج منها فوراً هي:", en: "The reserved word used to break a loop and exit immediately is:" },
    options: [
      { id: "a", text: { ar: "continue", en: "continue" } },
      { id: "b", text: { ar: "break", en: "break" } },
      { id: "c", text: { ar: "exit", en: "exit" } },
      { id: "d", text: { ar: "stop", en: "stop" } }
    ],
    correct: "b"
  },
  {
    id: "m48",
    question: { ar: "ماذا يحدث لو كان شرط الـ While Loop دائماً True ولا يتغير أبداً؟", en: "What happens if a While Loop condition is always True and never changes?" },
    options: [
      { id: "a", text: { ar: "البرنامج يقف فوراً", en: "The program stops immediately" } },
      { id: "b", text: { ar: "تحدث حلقة تكرار لانهائية (Infinite Loop) ويعلق البرنامج", en: "An Infinite Loop occurs and the program freezes" } },
      { id: "c", text: { ar: "يتحول الكود للغة الآلة", en: "The code translates to machine language" } },
      { id: "d", text: { ar: "تزيد مساحة الـ RAM", en: "RAM space increases" } }
    ],
    correct: "b"
  },
  {
    id: "m49",
    question: { ar: "عند كتابة لوب تبدأ بـ `while (true)` يجب وضع داخله شرط للخروج مع كلمة:", en: "When writing a loop starting with `while (true)`, we must include an exit condition with:" },
    options: [
      { id: "a", text: { ar: "int", en: "int" } },
      { id: "b", text: { ar: "break", en: "break" } },
      { id: "c", text: { ar: "print", en: "print" } },
      { id: "d", text: { ar: "if else", en: "if else" } }
    ],
    correct: "b"
  },
  {
    id: "m50",
    question: { ar: "العداد (Counter) في حلقات التكرار وظيفته الأساسية:", en: "The Counter in loops is mainly responsible for:" },
    options: [
      { id: "a", text: { ar: "تخزين نصوص طويلة", en: "Storing long strings" } },
      { id: "b", text: { ar: "حساب عدد مرات التكرار الحالية والتحكم في النهاية", en: "Counting the current iterations and controlling the end" } },
      { id: "c", text: { ar: "ترجمة السطور البرمجية", en: "Translating code lines" } },
      { id: "d", text: { ar: "تشغيل تطبيق Pydroid", en: "Running Pydroid application" } }
    ],
    correct: "b"
  },

  // 51-60: Python Intro & Operations & Precedence
  {
    id: "m51",
    question: { ar: "لماذا تعتبر لغة Python من أشهر وأسهل لغات البرمجة للمبتدئين؟", en: "Why is Python considered one of the most famous and easiest languages for beginners?" },
    options: [
      { id: "a", text: { ar: "لأنها قريبة جداً من فهم وقراءة اللغة الإنجليزية", en: "Because it is very close to understanding and reading English" } },
      { id: "b", text: { ar: "لأنها مخصصة للـ Hardware فقط", en: "Because it is dedicated to hardware only" } },
      { id: "c", text: { ar: "لأنها لا تحتاج لمترجم", en: "Because it does not need a translator" } },
      { id: "d", text: { ar: "لأنها تعمل بدون ذاكرة عشوائية", en: "Because it runs without RAM" } }
    ],
    correct: "a"
  },
  {
    id: "m52",
    question: { ar: "أفضل تطبيق لتشغيل وكتابة أكواد Python على هواتف الأندرويد هو:", en: "The best application to run and write Python codes on Android phones is:" },
    options: [
      { id: "a", text: { ar: "VS Code", en: "VS Code" } },
      { id: "b", text: { ar: "Pydroid 3", en: "Pydroid 3" } },
      { id: "c", text: { ar: "Canva", en: "Canva" } },
      { id: "d", text: { ar: "Replit", en: "Replit" } }
    ],
    correct: "b"
  },
  {
    id: "m53",
    question: { ar: "موقع مجاني يعمل من المتصفح مباشرة لكتابة الأكواد بدون تثبيت برامج هو:", en: "A free online browser IDE to write code without installing software is:" },
    options: [
      { id: "a", text: { ar: "VS Code", en: "VS Code" } },
      { id: "b", text: { ar: "Replit", en: "Replit" } },
      { id: "c", text: { ar: "Pydroid", en: "Pydroid" } },
      { id: "d", text: { ar: "Python.org", en: "Python.org" } }
    ],
    correct: "b"
  },
  {
    id: "m54",
    question: { ar: "في لغة بايثون، الدالة المستخدمة لطباعة وإخراج البيانات للمستخدم هي:", en: "In Python, the function used to print and output data to the user is:" },
    options: [
      { id: "a", text: { ar: "input()", en: "input()" } },
      { id: "b", text: { ar: "print()", en: "print()" } },
      { id: "c", text: { ar: "out()", en: "out()" } },
      { id: "d", text: { ar: "text()", en: "text()" } }
    ],
    correct: "b"
  },
  {
    id: "m55",
    question: { ar: "الدالة المستخدمة في بايثون لاستقبال المدخلات من المستخدم عبر الكيبورد هي:", en: "The function used in Python to receive user input via keyboard is:" },
    options: [
      { id: "a", text: { ar: "print()", en: "print()" } },
      { id: "b", text: { ar: "input()", en: "input()" } },
      { id: "c", text: { ar: "get()", en: "get()" } },
      { id: "d", text: { ar: "read()", en: "read()" } }
    ],
    correct: "b"
  },
  {
    id: "m56",
    question: { ar: "في بايثون، ناتج عملية القسمة العادية مثل (10 / 5) يكون دائماً من النوع:", en: "In Python, the result of a normal division like (10 / 5) is always of type:" },
    options: [
      { id: "a", text: { ar: "Integer (int)", en: "Integer (int)" } },
      { id: "b", text: { ar: "Float (رقم عشري)", en: "Float (decimal number)" } },
      { id: "c", text: { ar: "String", en: "String" } },
      { id: "d", text: { ar: "Boolean", en: "Boolean" } }
    ],
    correct: "b"
  },
  {
    id: "m57",
    question: { ar: "ما هو ناتج طباعة الكود التالي في بايثون: `print(2 * (3 + 4))`؟", en: "What is the output of the following Python code: `print(2 * (3 + 4))`?" },
    options: [
      { id: "a", text: { ar: "10", en: "10" } },
      { id: "b", text: { ar: "14", en: "14" } },
      { id: "c", text: { ar: "24", en: "24" } },
      { id: "d", text: { ar: "16", en: "16" } }
    ],
    correct: "b"
  },
  {
    id: "m58",
    question: { ar: "ما هي أولى الأولويات في العمليات الحسابية داخل بايثون؟", en: "What is the highest priority in mathematical operations inside Python?" },
    options: [
      { id: "a", text: { ar: "الضرب والقسمة", en: "Multiplication and Division" } },
      { id: "b", text: { ar: "ما بين الأقواس أولاً", en: "Expressions inside Parentheses first" } },
      { id: "c", text: { ar: "الجمع والطرح", en: "Addition and Subtraction" } },
      { id: "d", text: { ar: "من اليمين للشمال دائماً", en: "Always from right to left" } }
    ],
    correct: "b"
  },
  {
    id: "m59",
    question: { ar: "ما هو ناتج الكود التالي: `print(10 - 2 * 3)`؟", en: "What is the output of: `print(10 - 2 * 3)`?" },
    options: [
      { id: "a", text: { ar: "24", en: "24" } },
      { id: "b", text: { ar: "4", en: "4" } },
      { id: "c", text: { ar: "8", en: "8" } },
      { id: "d", text: { ar: "16", en: "16" } }
    ],
    correct: "b"
  },
  {
    id: "m60",
    question: { ar: "الرمز المستخدم لكتابة تعليق (Comment) يتجاهله مترجم بايثون هو:", en: "The symbol used to write a comment that the Python translator ignores is:" },
    options: [
      { id: "a", text: { ar: "//", en: "//" } },
      { id: "b", text: { ar: "#", en: "#" } },
      { id: "c", text: { ar: "/*", en: "/*" } },
      { id: "d", text: { ar: "--", en: "--" } }
    ],
    correct: "b"
  }
];

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

function shuffleArray(array: any[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function TechVerseFinalExam() {
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const [studentInfo, setStudentInfo] = useState({ name: "", phone: "", expectedScore: "" });
  const [isRegistered, setIsRegistered] = useState(false);

  const [selectedMCQs, setSelectedMCQs] = useState<any[]>([]);
  const [selectedEssays, setSelectedEssays] = useState<any[]>([]);

  const [mcqAnswers, setMcqAnswers] = useState<{ [key: string]: string }>({});
  const [essayAnswers, setEssayAnswers] = useState<{ [key: string]: string }>({});

  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [cheatTriggered, setCheatTriggered] = useState(false);

  const [timeLeft, setTimeLeft] = useState(2400);
  const examSubmittedRef = useRef(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInfo.name || !studentInfo.phone || !studentInfo.expectedScore) {
      alert(lang === "ar" ? "برجاء ملء البيانات كاملة يا بطل!" : "Please fill in all details!");
      return;
    }

    const randomizedMCQs = shuffleArray(MCQ_POOL).slice(0, 20).map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    const randomizedEssays = shuffleArray(ESSAY_POOL).slice(0, 5);

    setSelectedMCQs(randomizedMCQs);
    setSelectedEssays(randomizedEssays);
    setIsRegistered(true);
    setExamStarted(true);
    setTimeLeft(2400);
  };

  useEffect(() => {
    if (!examStarted || examSubmitted) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          triggerAutoSubmit(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [examStarted, examSubmitted]);

  // =======================================================
  // نظام مكافحة الغش المطور الذكي (مراقبة الـ Blur والـ Visibility والـ Width فقط)
  // =======================================================
  useEffect(() => {
    if (!examStarted || examSubmitted) return;

    // حفظ العرض الأولي الفعلي للشاشة لحظة تشغيل وعرض ورقة التقييم
    const initialWidth = window.innerWidth;

    const handleCheatDetection = () => {
      setCheatTriggered(true);
      triggerAutoSubmit(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) handleCheatDetection();
    };

    const handleResize = () => {
      // كيبورد الموبايل بتغير الارتفاع (height) فقط، العرض بيفضل زي ما هو
      // لو العرض (width) اتغير بشكل ملحوظ، يبقى قسّم الشاشة أو فتح الـ Inspect element على الكمبيوتر
      // حطينا فرق 40 بكسل للتسامح مع ظهور أو إخفاء الـ Scrollbars البرمجية بشكل مفاجئ
      const widthDiff = Math.abs(window.innerWidth - initialWidth);
      if (widthDiff > 40) {
        handleCheatDetection();
      }
    };

    // 1. مراقبة مغادرة الـ Tab أو إنزال المتصفح لأسفل
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 2. مراقبة فقدان التركيز (تنبثق نافذة تانية أو برنامج فوق الـ Browser)
    window.addEventListener("blur", handleCheatDetection);

    // 3. مراقبة الـ Resize الذكي (للعرض فقط لمنع تداخل كيبورد الموبايلات)
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleCheatDetection);
      window.removeEventListener("resize", handleResize);
    };
  }, [examStarted, examSubmitted]);

  const triggerAutoSubmit = async (wasCheated: boolean = false) => {
    if (examSubmittedRef.current) return;
    examSubmittedRef.current = true;
    setExamSubmitted(true);
    setExamStarted(false);

    let mcqScore = 0;
    selectedMCQs.forEach((q) => {
      if (mcqAnswers[q.id] === q.correct) {
        mcqScore += 1;
      }
    });

    const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; 
    const TELEGRAM_CHAT_ID = "YOUR_TELEGRAM_CHAT_ID";

    let msg = `🚨 *إشعار امتحان شامل - Tech Verse* 🚨\n\n`;
    msg += `👤 *اسم الطالب:* ${studentInfo.name}\n`;
    msg += `📞 *رقم الفون:* ${studentInfo.phone}\n`;
    msg += `🔮 *التوقع المسبق:* ${studentInfo.expectedScore}/100\n`;
    msg += `⏱️ *الوقت المتبقي عند التسليم:* ${Math.floor(timeLeft / 60)} دقيقة و ${timeLeft % 60} ثانية\n`;
    msg += `⚠️ *حالة الغش/الخروج:* ${wasCheated ? "❌ نعم (تم رصد تغيير حجم عرض الشاشة أو مغادرة التاب!)" : timeLeft === 0 ? "⏰ إنتهى الوقت تلقائياً" : "✅ طبيعي"}\n\n`;
    msg += `📊 *درجة الاختيارات:* *${mcqScore} من 20*\n\n`;
    msg += `📝 *إجابات الأسئلة المقالية والبرمجية للتصحيح:* \n`;

    selectedEssays.forEach((q, index) => {
      const studentAns = essayAnswers[q.id] || "لم يقم بالإجابة";
      msg += `\n*س ${index + 1}: ${q.question.ar}*\n✍️ *إجابة الطالب:* ${studentAns}\n`;
    });

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: "Markdown",
        }),
      });
    } catch (err) {
      console.error("Telegram bot delivery failed:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-400 tracking-wide">Tech Verse Portal</h1>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold transition text-white"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {!isRegistered && !examSubmitted && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-center text-indigo-400">
              {lang === "ar" ? "الامتحان التقييمي النهائي 🚀" : "Ultimate Comprehensive Exam 🚀"}
            </h2>
            <p className="text-slate-400 text-sm mb-6 text-center">
              {lang === "ar" ? "جاهز للشوامل؟ أدخل بياناتك لتحميل ورقة الأسئلة المخصصة لك عشوائياً." : "Ready? Provide details to load your unique randomized test paper."}
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  {lang === "ar" ? "الاسم الثلاثي للطالب:" : "Student Full Name (Triple):"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === "ar" ? "اكتب اسمك كاملاً" : "Enter full name"}
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
                  placeholder="01xxxxxxxxx"
                  value={studentInfo.phone}
                  onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-indigo-300 font-semibold">
                  {lang === "ar" ? "💡 حتة روشة: تتوقع تجيب كام من 100 في الشامل ده؟" : "💡 Expectation check: What score out of 100 do you predict?"}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  placeholder="e.g. 98"
                  value={studentInfo.expectedScore}
                  onChange={(e) => setStudentInfo({ ...studentInfo, expectedScore: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="bg-amber-950/40 border border-amber-900/60 rounded-xl p-4 text-xs text-amber-300 space-y-2">
                <p className="font-bold">⚠️ {lang === "ar" ? "تعليمات صارمة للتايمر ومكافحة الغش:" : "Strict Timer & Anti-Cheat Rules:"}</p>
                <p>1. {lang === "ar" ? "مدة الامتحان 40 دقيقة فقط وسيتم الإرسال التلقائي فور انتهاء الوقت." : "Exam duration is 40 minutes sharp. It auto-submits upon completion."}</p>
                <p>2. {lang === "ar" ? "ممنوع تماماً تغيير التاب، فتح الـ Inspect، أو تقسيم عرض الشاشة على اللاب توب. الكيبورد على الموبايل مسموح بها بالكامل!" : "Leaving the tab, opening Inspect Element, or splitting the window width locks entry. Mobile keyboards are fully allowed!"}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-3.5 rounded-xl font-bold tracking-wide transition text-white shadow-lg shadow-indigo-600/20"
              >
                {lang === "ar" ? "توليد الأسئلة وبدء المؤقت 🏁" : "Generate Layout & Start Timer 🏁"}
              </button>
            </form>
          </div>
        )}

        {examStarted && !examSubmitted && (
          <div className="space-y-8">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sticky top-16 z-40 backdrop-blur flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm font-semibold text-slate-200">{studentInfo.name}</p>
                <p className="text-xs text-slate-400">{lang === "ar" ? "النسخة الامتحانية العشوائية المخصصة لك" : "Your dynamic randomized version"}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`px-4 py-1.5 rounded-lg font-mono font-bold border text-sm ${timeLeft < 300 ? "bg-red-950 text-red-400 border-red-900 animate-pulse" : "bg-slate-950 text-emerald-400 border-slate-800"}`}>
                  ⏱️ {formatTime(timeLeft)}
                </div>
                <span className="px-3 py-1 bg-red-950/60 text-red-400 text-xs rounded-full font-semibold border border-red-900">
                  {lang === "ar" ? "مكافحة الغش نشطة" : "Anti-Cheat Active"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-4 border-b border-slate-800 pb-2">
                {lang === "ar" ? "أولاً: أسئلة الاختيار من متعدد (20 سؤال عشوائي)" : "Part 1: Multiple Choice (20 Random MCQs)"}
              </h3>
              <div className="space-y-6">
                {selectedMCQs.map((q, idx) => (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                    <p className="font-medium text-slate-200 mb-4 leading-relaxed">
                      <span className="text-indigo-400 font-bold mr-1">{idx + 1}.</span> {lang === "ar" ? q.question.ar : q.question.en}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt: any) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setMcqAnswers({ ...mcqAnswers, [q.id]: opt.id })}
                          className={`w-full text-right p-3 rounded-xl border text-sm transition flex justify-between items-center ${
                            mcqAnswers[q.id] === opt.id
                              ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium"
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

            <div className="pt-6">
              <h3 className="text-xl font-bold text-indigo-400 mb-4 border-b border-slate-800 pb-2">
                {lang === "ar" ? "ثانياً: التطبيق المقالي والبرمجي (5 أسئلة عشوائية)" : "Part 2: Code Architecture & Essay (5 Tasks)"}
              </h3>
              <div className="space-y-6">
                {selectedEssays.map((q, idx) => (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                    <p className="font-medium text-slate-200 mb-3 leading-relaxed">
                      <span className="text-indigo-400 font-bold mr-1">{idx + 1}.</span> {lang === "ar" ? q.question.ar : q.question.en}
                    </p>
                    <textarea
                      rows={6}
                      placeholder={lang === "ar" ? "اكتب الإجابة الشاملة أو كود بايثون هنا..." : "Provide your full response or write Python syntax here..."}
                      value={essayAnswers[q.id] || ""}
                      onChange={(e) => setEssayAnswers({ ...essayAnswers, [q.id]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition font-mono whitespace-pre"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => triggerAutoSubmit(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold tracking-wide transition text-white shadow-lg shadow-emerald-600/20"
            >
              {lang === "ar" ? "تسليم وإنهاء الشامل الآن 🏁" : "Complete & Submit Exam 🏁"}
            </button>
          </div>
        )}

        {examSubmitted && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 max-w-md mx-auto shadow-xl mt-12">
            <div className="w-16 h-16 bg-emerald-950 border border-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-400 font-bold text-2xl">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                {cheatTriggered 
                  ? (lang === "ar" ? "تم قفل وسحب الامتحان!" : "Exam Intercepted & Locked!")
                  : timeLeft === 0 
                  ? (lang === "ar" ? "انتهى الوقت وتم التسليم!" : "Time's Up! Auto Submitted!")
                  : (lang === "ar" ? "تم الإرسال بنجاح يا بطل!" : "Successfully Dispatched!")}
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                {cheatTriggered
                  ? (lang === "ar" ? "بسبب رصد محاولة غش (تغيير عرض النافذة، فتح Inspect Element، أو تقسيم الشاشة على اللاب توب)، تم قفل الصفحة فوراً وسحب تقدمك الحالي وإرساله مباشرة للبشمهندس محمد." : "Due to window horizontal resizing, Inspect Element initialization, or split-screen triggers, progress was frozen and transmitted straight to Mr. Mohamed.")
                  : (lang === "ar" ? "إجاباتك بالكامل اتسجلت في السيرفر ووصلت حالا للبشمهندس محمد عشان يصحح الجزء المقالي بنفسه ويعلن النتيجة لاحقاً." : "Your transcript has been cataloged and routed directly to Mr. Mohamed for manual grading.")}
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-indigo-400 font-medium">
              ℹ️ {lang === "ar" ? "تنبيه: لن تظهر النتيجة هنا لضمان السرية والتقييم اليدوي للبرامج." : "Notice: Scores are encrypted here. Evaluation results will be shared directly by your coach."}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}