/**
 * カルーセル機能
 * 自動切り替えとユーザー操作の両方に対応
 */

class Carousel {
    constructor(container) {
        console.log('Carousel constructor called with:', container);
        this.container = container;
        this.slides = container.querySelectorAll('.about__slide');
        this.indicators = container.querySelectorAll('.about__indicator');
        
        console.log('Found slides:', this.slides.length);
        console.log('Found indicators:', this.indicators.length);
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 3000; // 3秒間隔
        
        this.init();
    }
    
    init() {
        console.log('Carousel init() called');
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlide(0);
        console.log('Carousel initialization complete');
    }
    
    bindEvents() {
        console.log('Binding events...');
        // インジケーター
        this.indicators.forEach((indicator, index) => {
            console.log(`Adding click event to indicator ${index}`);
            indicator.addEventListener('click', () => {
                console.log(`Indicator ${index} clicked`);
                this.goToSlide(index);
            });
        });
        
        // マウスホバーで自動再生を一時停止
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // タッチ操作（スワイプ）
        this.addTouchEvents();
        
        // マウスドラッグ操作
        this.addMouseEvents();
        
        console.log('Events bound successfully');
    }
    
    addTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    addMouseEvents() {
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        this.container.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            this.container.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        this.container.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });
        
        this.container.addEventListener('mouseup', (e) => {
            if (isDragging) {
                endX = e.clientX;
                this.handleSwipe(startX, endX);
                isDragging = false;
                this.container.style.cursor = 'grab';
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                this.container.style.cursor = 'grab';
            }
        });
        
        // カーソルスタイルを設定
        this.container.style.cursor = 'grab';
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // スワイプの最小距離
        const diff = startX - endX;
        
        console.log(`Swipe detected: startX=${startX}, endX=${endX}, diff=${diff}`);
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                console.log('Swiping left - next slide');
                this.nextSlide(); // 左スワイプで次のスライド
            } else {
                console.log('Swiping right - previous slide');
                this.prevSlide(); // 右スワイプで前のスライド
            }
        } else {
            console.log('Swipe distance too small, ignoring');
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index === this.currentSlide) return;
        
        this.currentSlide = index;
        this.updateSlide(index);
        this.resetAutoPlay();
    }
    
    updateSlide(index) {
        console.log(`Updating slide to index: ${index}`);
        // スライドの表示切り替え
        this.slides.forEach((slide, i) => {
            slide.classList.remove('about__slide--active', 'about__slide--prev');
            
            if (i === index) {
                slide.classList.add('about__slide--active');
                console.log(`Slide ${i} set to active`);
            } else if (i < index) {
                slide.classList.add('about__slide--prev');
                console.log(`Slide ${i} set to prev`);
            } else {
                console.log(`Slide ${i} set to hidden`);
            }
        });
        
        // インジケーターの更新
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('about__indicator--active', i === index);
        });
        console.log(`Slide update complete. Current slide: ${index}`);
    }
    
    startAutoPlay() {
        console.log('Starting auto play...');
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            console.log('Auto play: next slide');
            this.nextSlide();
        }, this.autoPlayDelay);
        console.log('Auto play started with interval:', this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    // ページが非表示になった時に自動再生を停止
    handleVisibilityChange() {
        if (document.hidden) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }
}

// 初期化はmain.jsで行うため、ここでは削除

export default Carousel;
