document.getElementById("calculate").addEventListener("click", () => {
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();

  if (name1 === "" || name2 === "") {
    alert("من فضلك قم بملئ خانة الحبيب والحبيبه معا");
    return;
  }

  const resultElement = document.getElementById("result");
  const giftElement = document.getElementById("gift");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  // إعادة تهيئة النتيجة والتأثيرات
  resultElement.style.display = "none";
  resultElement.style.animation = "none"; // إزالة أي تأثير سابق
  resultElement.textContent = "0%";

  // إزالة الفقاعات السابقة
  const bubbleContainer = document.querySelector(".bubbles");
  bubbleContainer.innerHTML = "";

  // إعادة إظهار النتيجة
  resultElement.style.display = "block";
  resultElement.style.animation = "colorChange 0.2s infinite"; // إعادة تشغيل تغيير الألوان

  let percentage = 0;
  const target = Math.floor(Math.random() * 101); // النسبة النهائية العشوائية
  let isIncreasing = true;

  // حركة الصعود والنزول العشوائية
  const randomInterval = setInterval(() => {
    if (isIncreasing) {
      percentage += Math.floor(Math.random() * 10) + 1; // صعود سريع
    } else {
      percentage -= Math.floor(Math.random() * 10) + 1; // نزول سريع
    }

    if (percentage >= 100) isIncreasing = false; // تغيير الاتجاه للنزول
    if (percentage <= 0) isIncreasing = true; // تغيير الاتجاه للصعود

    resultElement.textContent = `${Math.abs(percentage)}%`; // ضمان عدم وجود أرقام سالبة
  }, 100);

  // إيقاف الحركة عند النسبة النهائية
  setTimeout(() => {
    clearInterval(randomInterval);
    percentage = target;
    resultElement.textContent = `${percentage}%`;

    // تعطيل تأثير الألوان المتغيرة
    resultElement.style.animation = "none";

    // اختيار لون عشوائي نهائي
    const finalColors = [
      "rgb(255, 0, 0)",     // أحمر
      "rgb(255, 105, 180)", // وردي
      "rgb(148, 0, 211)",   // بنفسجي غامق
      "rgb(255, 69, 0)",    // برتقالي محمر
      "rgb(199, 21, 133)",  // بنفسجي وردي
    ];
    const randomColor = finalColors[Math.floor(Math.random() * finalColors.length)];
    resultElement.style.color = randomColor;

    // بدء التدوير
    resultElement.style.animation = "spin 2s ease-out forwards";

    // إنشاء الفقاعات
    createBubbles();

    // عرض الهدية
    giftElement.style.display = "block"; // إظهار الهدية
  }, 3000); // مدة الحركة (3 ثوانٍ)
});

// إنشاء الفقاعات
function createBubbles() {
  const bubbleContainer = document.querySelector(".bubbles");
  for (let i = 0; i < 30; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 3 + 2}s`;
    bubble.style.opacity = Math.random();
    bubbleContainer.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 5000);
  }
}

// عند الضغط على الهدية
document.getElementById("gift").addEventListener("click", () => {
  const percentage = parseInt(document.getElementById("result").textContent);

  let message = "";
  let popupColor = ""; // المتغير الذي سيحمل لون النافذة المنبثقة

  // تحديد الرسالة والنسبة بناءً على النسبة
  if (percentage <= 10) {
    message = "علاقة فاشلة";
    popupColor = "black"; // لون أسود
  } else if (percentage <= 35) {
    message = "علاقة ناجحة قليلاً مع الكثير من المشاكل";
    popupColor = "lightcoral"; // لون أحمر فاتح
  } else if (percentage <= 70) {
    message = "علاقة ناجحة مع القليل من المشاكل";
    popupColor = "darkred"; // لون أحمر غامق
  } else {
    message = "علاقة ناجحة مع حياة وردية";
    popupColor = "pink"; // لون وردي
  }

  // عرض النافذة المنبثقة
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = message;

  // تغيير لون النافذة المنبثقة حسب النسبة
  popup.style.backgroundColor = popupColor;

  popup.style.display = "flex";  // التأكد من عرض النافذة المنبثقة
});

// إغلاق النافذة المنبثقة عند الضغط على إغلاق
document.querySelector(".popup-close").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// إغلاق النافذة المنبثقة عند الضغط على أي مكان في الموقع
document.addEventListener("click", (event) => {
  const popup = document.getElementById("popup");
  if (!popup.contains(event.target) && !document.getElementById("gift").contains(event.target)) {
    popup.style.display = "none";
  }
});
