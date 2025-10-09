// ヒーローセクション関連の機能
export class Hero {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        this.setupHeroBackground();
    }

    // ヒーロー背景画像を動的に設定
    setupHeroBackground() {
        if (this.hero) {
            const heroImageUrl = this.hero.getAttribute('data-hero');
            if (heroImageUrl) {
                this.setHeroImage(heroImageUrl);
            }
        }
    }

    setHeroImage(imageUrl) {
        // CSS変数として設定
        this.hero.style.setProperty('--hero-image', `url('${imageUrl}')`);
        this.hero.style.setProperty('--hero-image-opacity', '0.35');
        
        // CSS疑似要素に背景を反映
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .hero::before {
                background-image: var(--hero-image, none);
                opacity: var(--hero-image-opacity, 0.35);
            }
        `;
        document.head.appendChild(styleEl);
    }
}
