// ==================== التبديل بين القوائم الجانبية ====================
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('open');
}

// إغلاق السايد بار عند الضغط خارجها
document.addEventListener('click', function(e){
    const sideMenu = document.getElementById('sideMenu');
    const menuBtn = document.querySelector('.menu-btn');
    if(sideMenu && !sideMenu.contains(e.target) && !menuBtn.contains(e.target)){
        sideMenu.classList.remove('open');
    }
});

// ==================== تسجيل الخروج ====================
function logout() {
    window.location.href = 'login.html';
}

// ==================== البحث والفلترة في صفحة الوظائف ====================
function searchJobs() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        const title = job.querySelector('h3').textContent.toLowerCase();
        job.style.display = title.includes(input) ? 'block' : 'none';
    });
}

function filterJobs() {
    const filter = document.getElementById('jobFilter').value;
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        job.style.display = (filter === 'all' || job.dataset.category === filter) ? 'block' : 'none';
    });
}

// ==================== زر التقديم يوجه مباشرة لصفحة التوافق ====================
function openPopup(jobTitle) {
    localStorage.setItem('selectedJob', jobTitle);
    window.location.href = 'match.html';
}

// ==================== صفحة تقرير التوافق ====================
document.addEventListener('DOMContentLoaded', () => {
    const matchBar = document.getElementById('matchBar');
    const percentageLabel = document.getElementById('percentageLabel');
    const gapList = document.getElementById('gapList');
    const recList = document.getElementById('recList');

    if(matchBar){
        const jobTitle = localStorage.getItem('selectedJob') || 'الوظيفة المختارة';
        
        const percent = Math.floor(Math.random() * 51) + 50; // 50% - 100%
        matchBar.style.width = percent + '%';
        percentageLabel.textContent = 'نسبة التوافق: ' + percent + '%';
        
        gapList.innerHTML = `
            <li>مهارة 1 ناقصة للوظيفة: ${jobTitle}</li>
            <li>مهارة 2 ناقصة للوظيفة: ${jobTitle}</li>
            <li>مهارة 3 ناقصة للوظيفة: ${jobTitle}</li>
        `;

        recList.innerHTML = `
            <li>معسكر تدريبي A</li>
            <li>معسكر تدريبي B</li>
            <li>معسكر تدريبي C</li>
        `;
    }
});

// ==================== زر التقديم النهائي ====================
function finalApply() {
    alert('تم تقديم طلبك النهائي بنجاح!');
}