/* ============================================================
   1. قاعدة بيانات محاكاة (بيانات المتقدمين المسترجعة)
   ============================================================ */
const mockDB = {
    "1000000001": { 
        name: "عبدالله بن علي الشهري", 
        uni: "جامعة الملك فهد للبترول والمعادن", 
        major: "هندسة برمجيات" 
    },
    "1000000002": { 
        name: "نورة بنت سعد القحطاني", 
        uni: "جامعة الأميرة نورة", 
        major: "أمن سيبراني" 
    },
    "1111111111": { 
        name: "خالد بن محمد العتيبي", 
        uni: "جامعة الملك سعود", 
        major: "إدارة أعمال" 
    },
    "default": { 
        name: "مستخدم جديد", 
        uni: "غير مسجل", 
        major: "غير مسجل" 
    }
};

/* ============================================================
   2. إدارة تسجيل الدخول والـ OTP (الرحلة الكاملة)
   ============================================================ */

// تبديل الواجهة بين متقدم وموظف
function toggleUserType() {
    const type = document.getElementById('userType').value;
    const applicantSection = document.getElementById('applicantFields');
    const employeeSection = document.getElementById('employeeFields');
    const errorDisplay = document.getElementById('loginError');

    errorDisplay.textContent = ""; // مسح الأخطاء عند التبديل

    if (type === 'applicant') {
        applicantSection.classList.remove('hidden');
        employeeSection.classList.add('hidden');
    } else {
        applicantSection.classList.add('hidden');
        employeeSection.classList.remove('hidden');
    }
}

// الخطوة 1: إرسال الرمز وإخفاء الخيارات (التعديل المطلوب)
function handleSendOtp() {
    const idInput = document.getElementById('loginId').value;
    const errorDisplay = document.getElementById('loginError');

    if (idInput.length === 10) {
        // --- التفاصيل المهمة: إخفاء العناصر لتركيز المستخدم ---
        document.getElementById('userTypeContainer').classList.add('hidden'); // إخفاء نوع المستخدم
        document.getElementById('idStep').classList.add('hidden');           // إخفاء حقل الهوية والزر
        
        // إظهار حقل الـ OTP
        document.getElementById('otpSection').classList.remove('hidden');
        errorDisplay.textContent = "";
    } else {
        errorDisplay.textContent = "يرجى إدخال رقم هوية صحيح مكون من 10 أرقام";
    }
}

// الخطوة 2: معالجة الرمز وجلب بيانات المتقدم للمراجعة
function processOtp() {
    const otp = document.getElementById('otpCode').value;
    const id = document.getElementById('loginId').value;
    const errorDisplay = document.getElementById('loginError');

    if (otp.length >= 4) {
        // إخفاء قسم الـ OTP وإظهار قسم مراجعة البيانات
        document.getElementById('otpSection').classList.add('hidden');
        document.getElementById('reviewDataSection').classList.remove('hidden');

        // جلب البيانات من القاعدة بناءً على الهوية
        const userData = mockDB[id] || mockDB["default"];
        
        // تعبئة الحقول ليقوم المستخدم بالتأكيد أو التعديل
        document.getElementById('editName').value = userData.name;
        document.getElementById('editUniversity').value = userData.uni;
        document.getElementById('editMajor').value = userData.major;
        
        errorDisplay.textContent = "";
    } else {
        errorDisplay.textContent = "يرجى إدخال رمز التحقق بشكل صحيح";
    }
}

// الخطوة 3: التأكيد النهائي وحفظ الجلسة
function confirmAndGo() {
    const finalName = document.getElementById('editName').value;
    const finalUni = document.getElementById('editUniversity').value;
    const finalMajor = document.getElementById('editMajor').value;

    if (finalName.trim() === "") {
        alert("يرجى التأكد من كتابة الاسم");
        return;
    }

    // حفظ البيانات في LocalStorage لتعمل في كل الصفحات
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', finalName);
    localStorage.setItem('userUniversity', finalUni);
    localStorage.setItem('userMajor', finalMajor);

    // التوجه لصفحة الوظائف
    window.location.href = 'dashboard.html';
}

// دخول الموظفين (تبسيط)
function employeeLogin() {
    const user = document.getElementById('empUser').value;
    const pass = document.getElementById('empPass').value;

    if (user === "Manqiyah" && pass === "1234") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', "مدير النظام");
        window.location.href = 'jobs.html';
    } else {
        document.getElementById('loginError').textContent = "اسم المستخدم أو كلمة المرور غير صحيحة";
    }
}

/* ============================================================
   3. إدارة صفحة الوظائف (البحث، الفلترة، الحماية)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const path = window.location.pathname;

    // أ- حماية الصفحات: منع الدخول لغير المسجلين
    if (!isLoggedIn && path.includes('jobs.html')) {
        window.location.href = 'login.html';
    }
    

    // ب- تحديث الهيدر: عرض اسم المستخدم الذي أكده في خطوة الدخول
    const savedName = localStorage.getItem('userName');
    const welcomeLink = document.getElementById('welcomeUser');
    if (savedName && welcomeLink) {
        welcomeLink.textContent = `أهلاً، ${savedName}`;
    }

    // ج- منطق صفحة التوافق (إذا كان المستخدم فيها)
    const matchBar = document.getElementById('matchBar');
    if (matchBar) {
        runMatchAnalysis();
    }
});

// وظيفة البحث النصي
function searchJobs() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const jobs = document.querySelectorAll('.job');

    jobs.forEach(job => {
        const title = job.querySelector('h3').textContent.toLowerCase();
        const desc = job.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(input) || desc.includes(input)) {
            job.style.display = 'block';
        } else {
            job.style.display = 'none';
        }
    });
}

// وظيفة الفلترة حسب القطاع
function filterJobs() {
    const filterValue = document.getElementById('jobFilter').value;
    const jobs = document.querySelectorAll('.job');

    jobs.forEach(job => {
        const category = job.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
            job.style.display = 'block';
        } else {
            job.style.display = 'none';
        }
    });
}

// ==================== السايد بار ====================

function toggleMenu(){

const menu=document.getElementById("sideMenu");

menu.classList.toggle("open");

}


// اغلاق السايدبار عند الضغط خارجها
document.addEventListener("click",function(e){

const menu=document.getElementById("sideMenu");

const btn=document.querySelector(".menu-btn");

if(!menu || !btn) return;

if(!menu.contains(e.target) && !btn.contains(e.target)){

menu.classList.remove("open");

}

});

// تسجيل الخروج ومسح الذاكرة
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}

// التقديم وفتح صفحة التوافق
function openPopup(jobTitle) {
    localStorage.setItem('selectedJob', jobTitle);
    window.location.href = 'match.html';
}

/* ============================================================
   4. محاكاة تحليل التوافق (صفحة Match)
   ============================================================ */
function runMatchAnalysis() {
    const percentageLabel = document.getElementById('percentageLabel');
    const matchBar = document.getElementById('matchBar');
    
    // نسبة عشوائية بين 65% و 98% لإعطاء واقعية
    const randomPercent = Math.floor(Math.random() * (98 - 65 + 1)) + 65;

    setTimeout(() => {
        matchBar.style.width = randomPercent + '%';
        percentageLabel.textContent = `نسبة توافق مؤهلاتك مع الوظيفة: ${randomPercent}%`;
    }, 500);
}
function finalApply(){

const job = localStorage.getItem("job") || "الوظيفة";

alert("تم إرسال طلبك للوظيفة: " + job + " بنجاح");

window.location.href = "jobs.html";

}