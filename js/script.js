// Мобильное меню - критичная часть уже в HTML
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    // Уже есть в HTML, но оставляем для совместимости
    if (burger) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, это якорная ссылка или обычная
            if (href === '#' || href.startsWith('#!')) return;
            
            const targetId = href.startsWith('#') ? href : null;
            
            if (targetId) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Отключаем наблюдение после анимации
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с классом .feature и .about-content
    document.querySelectorAll('.feature, .about-content, .hero').forEach(el => {
        observer.observe(el);
    });
    
    // Оптимизация загрузки изображений
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Полифил для старых браузеров
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});