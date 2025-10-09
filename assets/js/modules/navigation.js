// ナビゲーション関連の機能
export class Navigation {
    constructor() {
        this.navToggle = document.querySelector('.nav__toggle');
        this.navMenu = document.querySelector('.nav__menu');
        this.navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        this.header = document.querySelector('.header');
        this.lastScrollTop = 0;
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupScrollEffects();
    }

    // モバイルメニューの制御
    setupMobileMenu() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // メニューリンククリック時にメニューを閉じる
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }

    toggleMobileMenu() {
        const isActive = this.navMenu.classList.contains('nav__menu--active');
        
        this.navMenu.classList.toggle('nav__menu--active');
        this.navToggle.classList.toggle('nav__toggle--active');
        
        // アクセシビリティ属性を更新
        this.navToggle.setAttribute('aria-expanded', !isActive);
        this.navToggle.setAttribute('aria-label', !isActive ? 'メニューを閉じる' : 'メニューを開く');
    }

    closeMobileMenu() {
        if (this.navMenu.classList.contains('nav__menu--active')) {
            this.navMenu.classList.remove('nav__menu--active');
            this.navToggle.classList.remove('nav__toggle--active');
            
            // アクセシビリティ属性を更新
            this.navToggle.setAttribute('aria-expanded', 'false');
            this.navToggle.setAttribute('aria-label', 'メニューを開く');
        }
    }

    // スムーススクロール
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                }
            });
        });
    }

    scrollToSection(targetSection) {
        const headerHeight = this.header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // ヘッダーのスクロール効果
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                this.header.classList.add('header--scrolled');
            } else {
                this.header.classList.remove('header--scrolled');
            }
            
            this.lastScrollTop = scrollTop;
        });
    }
}
