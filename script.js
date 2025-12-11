// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация загрузки
    initLoader();
    
    // Создание динамических элементов фона
    createBinaryBackground('binary-background', 80, 1000, 3000, 'loader');
    createBinaryBackground('binary-code-bg', 150, 1500, 5000, 'main');
    createHieroglyphs('background-hieroglyphs', 40, 10000, 20000);
    
    // Запуск загрузки
    simulateLoading();
});

// Создание бинарного фона
function createBinaryBackground(containerId, count, minDuration, maxDuration, page) {
    const container = document.querySelector(`.${containerId}`);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const digit = document.createElement('div');
        digit.className = page === 'loader' ? 'binary-digit' : 'binary-code';
        
        // Случайные цифры 0 или 1
        const binaryValue = Math.random() > 0.5 ? '1' : '0';
        digit.textContent = binaryValue;
        
        // Случайная позиция
        const left = Math.random() * 100;
        digit.style.left = `${left}%`;
        
        // Случайная задержка анимации
        const delay = Math.random() * 5;
        digit.style.animationDelay = `${delay}s`;
        
        // Случайная продолжительность анимации
        const duration = minDuration + Math.random() * (maxDuration - minDuration);
        digit.style.animationDuration = `${duration}ms`;
        
        // Случайный размер
        const size = 0.8 + Math.random() * 1.2;
        digit.style.fontSize = `${size}rem`;
        
        // Случайная прозрачность
        const opacity = page === 'loader' ? 
            0.1 + Math.random() * 0.2 : 
            0.05 + Math.random() * 0.1;
        digit.style.opacity = opacity;
        
        container.appendChild(digit);
    }
}

// Создание иероглифов
function createHieroglyphs(containerId, count, minDuration, maxDuration) {
    const container = document.querySelector(`.${containerId}`);
    if (!container) return;
    
    // Набор китайских иероглифов
    const hieroglyphs = ['愛', '力', '和平', '勇氣', '智慧', '成功', '幸福', '健康', '財富', '美', '真理', '自由', '希望', '夢', '光', '暗', '火', '水', '風', '土'];
    
    for (let i = 0; i < count; i++) {
        const glyph = document.createElement('div');
        glyph.className = 'hieroglyph';
        
        // Случайный иероглиф
        const randomGlyph = hieroglyphs[Math.floor(Math.random() * hieroglyphs.length)];
        glyph.textContent = randomGlyph;
        
        // Случайная позиция
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        glyph.style.left = `${left}%`;
        glyph.style.top = `${top}%`;
        
        // Случайная задержка анимации
        const delay = Math.random() * 10;
        glyph.style.animationDelay = `${delay}s`;
        
        // Случайная продолжительность анимации
        const duration = minDuration + Math.random() * (maxDuration - minDuration);
        glyph.style.animationDuration = `${duration}ms`;
        
        // Случайный размер
        const size = 2 + Math.random() * 3;
        glyph.style.fontSize = `${size}rem`;
        
        // Случайный цвет (оттенки красного)
        const red = 255;
        const green = Math.floor(Math.random() * 100);
        const blue = Math.floor(Math.random() * 100);
        const alpha = 0.05 + Math.random() * 0.1;
        glyph.style.color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        
        // Случайный угол поворота
        const rotation = Math.random() * 360;
        glyph.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(glyph);
    }
}

// Симуляция загрузки
function simulateLoading() {
    const progressFill = document.querySelector('.progress-fill');
    const loaderSubtitle = document.querySelector('.loader-subtitle');
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressFill.style.width = `${progress}%`;
        
        // Обновление текста в зависимости от прогресса
        if (progress < 30) {
            loaderSubtitle.textContent = 'Загрузка модулей...';
        } else if (progress < 60) {
            loaderSubtitle.textContent = 'Инициализация системы...';
        } else if (progress < 90) {
            loaderSubtitle.textContent = 'Подготовка интерфейса...';
        } else {
            loaderSubtitle.textContent = 'Завершение загрузки...';
        }
        
        // Когда загрузка завершена
        if (progress >= 100) {
            clearInterval(interval);
            
            // Задержка перед показом основного контента
            setTimeout(() => {
                loader.style.opacity = '0';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    
                    // Анимация появления основного контента
                    mainContent.style.opacity = '0';
                    mainContent.style.transition = 'opacity 0.8s ease';
                    
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 100);
                    
                    // Запуск анимации никнейма
                    startNicknameAnimation();
                }, 800);
            }, 500);
        }
    }, 30);
}

// Анимация никнейма на главной странице
function startNicknameAnimation() {
    const nickname = document.getElementById('pulsing-nickname');
    
    setInterval(() => {
        nickname.style.opacity = nickname.style.opacity === '0.5' ? '1' : '0.5';
    }, 3000);
}

// Навигация между страницами
function navigateTo(page) {
    // Скрыть все страницы
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.add('hidden'));
    
    // Скрыть главный контент
    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('hidden');
    
    // Показать выбранную страницу
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        
        // Анимация появления страницы
        targetPage.style.opacity = '0';
        targetPage.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            targetPage.style.opacity = '1';
        }, 100);
    }
}

// Возврат на главную страницу
function goBack() {
    // Скрыть все страницы
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.add('hidden'));
    
    // Показать главный контент
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('hidden');
    
    // Анимация появления
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 100);
}

// Инициализация загрузчика
function initLoader() {
    // Создаем дополнительные элементы для более динамичного фона
    setTimeout(() => {
        // Добавляем дополнительные бинарные цифры на задний план загрузки
        const extraCount = 30;
        const container = document.querySelector('.binary-background');
        
        for (let i = 0; i < extraCount; i++) {
            setTimeout(() => {
                const digit = document.createElement('div');
                digit.className = 'binary-digit';
                
                const binaryValue = Math.random() > 0.5 ? '1' : '0';
                digit.textContent = binaryValue;
                
                const left = Math.random() * 100;
                digit.style.left = `${left}%`;
                
                const delay = Math.random() * 3;
                digit.style.animationDelay = `${delay}s`;
                
                const duration = 2000 + Math.random() * 3000;
                digit.style.animationDuration = `${duration}ms`;
                
                const size = 0.5 + Math.random() * 1;
                digit.style.fontSize = `${size}rem`;
                
                const opacity = 0.05 + Math.random() * 0.1;
                digit.style.opacity = opacity;
                
                container.appendChild(digit);
            }, i * 100);
        }
    }, 500);
}

// Добавляем обработчики для кнопок навигации
document.addEventListener('DOMContentLoaded', function() {
    // Автоматическая прокрутка наверх при переходе между страницами
    window.scrollTo(0, 0);
    
    // Добавляем звуковые эффекты при наведении на кнопки (опционально)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Можно добавить звуковой эффект при наведении
            // playHoverSound();
        });
        
        button.addEventListener('click', function() {
            // Можно добавить звуковой эффект при клике
            // playClickSound();
        });
    });
});
