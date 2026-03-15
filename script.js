// ================= بيانات نموذجية =================
let matchPercentage = 0.82; // نسبة التوافق (0-1)
let gaps = ["مهارة البرمجة المتقدمة", "التواصل", "إدارة الوقت"];
let recommendations = [
    { name: "معسكر برمجة متقدم", link: "#" },
    { name: "دورة تواصل فعال", link: "#" },
    { name: "ورشة إدارة الوقت", link: "#" }
];

// ================= تهيئة الصفحة =================
window.addEventListener("DOMContentLoaded", function() {
    // ================ مؤشر التوافق =================
    let matchBar = document.getElementById("matchBar");
    let percentageLabel = document.getElementById("percentageLabel");
    let percentage = Math.round(matchPercentage * 100);
    matchBar.style.width = percentage + "%";

    // تحديد اللون حسب النطاق
    if(matchPercentage >= 0.9){
        matchBar.style.background = "#047857"; // أخضر داكن
    } else if(matchPercentage >= 0.7){
        matchBar.style.background = "#10b981"; // أخضر فاتح
    } else if(matchPercentage >= 0.5){
        matchBar.style.background = "#f59e0b"; // برتقالي
    } else {
        matchBar.style.background = "#ef4444"; // أحمر
    }
    percentageLabel.innerText = `نسبة التوافق: ${percentage}%`;

    // ================ تقرير الفجوات =================
    let gapList = document.getElementById("gapList");
    gaps.forEach(function(item){
        let li = document.createElement("li");
        li.innerText = item;
        gapList.appendChild(li);
    });

    // ================ التوصيات =================
    let recList = document.getElementById("recList");
    recommendations.forEach(function(item){
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = item.link;
        a.target = "_blank";
        a.innerText = item.name;
        li.appendChild(a);
        recList.appendChild(li);
    });

    // ================ زر التقديم النهائي =================
    if(matchPercentage >= 0.5){
        document.getElementById("finalApplyBtn").style.display = "inline-block";
    }
});

// ================= تقديم نهائي =================
function finalApply(){
    alert("تم تقديم طلبك النهائي بنجاح!");
}