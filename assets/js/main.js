// メインJavaScriptファイル - モジュール化された機能を統合
import { Navigation } from './modules/navigation.js';
import { Hero } from './modules/hero.js';
import { FormHandler } from './modules/form.js';
import { Utils } from './modules/utils.js';
import { NewsManager } from './modules/news.js';
import Carousel from './modules/carousel.js';

// アプリケーションの初期化
class App {
    constructor() {
        this.init();
    }

    init() {
        // DOMが読み込まれた後に実行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeModules();
            });
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            // 各モジュールを初期化
            this.navigation = new Navigation();
            this.hero = new Hero();
            this.formHandler = new FormHandler();
            
            // カルーセルを初期化
            this.initializeCarousel();
            
            // TOPに戻るボタン
            this.initializeBackToTop();
            
            // お知らせ管理
            this.newsManager = new NewsManager();
            
            // 店舗地図モーダル
            this.initializeStoreMapModal();
            
            // ローディングアニメーション
            this.initializeLoadingAnimation();
            
            // リサイズイベントの最適化
            this.setupResizeHandler();
            
            // アプリケーションが正常に初期化されました
        } catch (error) {
            console.error('アプリケーションの初期化中にエラーが発生しました:', error);
        }
    }

    initializeCarousel() {
        // カルーセル初期化を開始
        const carouselContainer = document.querySelector('.about__carousel');
        
        if (carouselContainer) {
            const slides = carouselContainer.querySelectorAll('.about__slide');
            const indicators = carouselContainer.querySelectorAll('.about__indicator');
            // スライドとインジケーターを確認
            
            this.carousel = new Carousel(carouselContainer);
            
            // ページの可視性変更を監視
            document.addEventListener('visibilitychange', () => {
                this.carousel.handleVisibilityChange();
            });
            
            // グローバルに保存（開発時のデバッグ用）
            window.aboutCarousel = this.carousel;
            
            // カルーセルが初期化されました
        } else {
            console.warn('カルーセルコンテナが見つかりません');
        }
    }

    setupResizeHandler() {
        const handleResize = Utils.debounce(() => {
            // リサイズ時の処理
            // ウィンドウがリサイズされました
            
            // 必要に応じて各モジュールのリサイズ処理を呼び出し
            if (this.navigation) {
                // ナビゲーションのリサイズ処理があれば呼び出し
            }
        }, 250);

        window.addEventListener('resize', handleResize);
    }

    initializeBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        
        if (!backToTopButton) return;

        // スクロール位置を監視してボタンの表示/非表示を制御
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // クリック時にページトップにスムーズスクロール
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    initializeLoadingAnimation() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (!loadingScreen) return;

        // ページ読み込み完了時にローディングを非表示
        window.addEventListener('load', () => {
            // 最小表示時間を確保（UX向上のため）
            setTimeout(() => {
                loadingScreen.classList.add('hide');
                
                // アニメーション完了後に要素を削除
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 500); // CSS transition時間と合わせる
            }, 300); // より短い時間に変更
        });

        // ページ遷移時のローディング表示
        this.setupPageTransitionLoading();
    }

    setupPageTransitionLoading() {
        // 内部リンク（アンカーリンク以外）のクリックを監視
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // 外部リンク、アンカーリンク、JavaScriptリンクは除外
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('javascript:') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                link.target === '_blank' ||
                link.hasAttribute('download')) {
                return;
            }
            
            // 現在のページのパスを取得
            const currentPath = window.location.pathname;
            const currentFileName = currentPath.split('/').pop() || 'index.html';
            
            // リンク先のパスを取得
            let targetPath = href;
            let targetFileName = targetPath.split('/').pop() || 'index.html';
            
            // 相対パスの場合、現在のディレクトリを基準に解決
            if (!href.startsWith('http') && !href.startsWith('/')) {
                const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                targetPath = currentDir + href;
                targetFileName = href.split('/').pop() || 'index.html';
            }
            
            // 同じHTMLファイルへのリンクは除外（アンカーリンクも含む）
            if (targetFileName === currentFileName) {
                // 同じHTMLファイルへのリンクのため、ローディングを表示しません
                return;
            }
            
            // お知らせページのページネーションリンクは除外
            if (href.includes('?page=') && currentFileName === 'news.html') {
                // お知らせページのページネーションのため、ローディングを表示しません
                return;
            }
            
            // 異なるHTMLファイルへのリンクのため、ローディングを表示します
            
            // ローディング画面を表示
            this.showLoadingScreen();
            
            // 実際のページ遷移を許可（デフォルトの動作を継続）
            // preventDefault()は呼ばない
        });
    }

    showLoadingScreen() {
        // ローディング画面が既に存在する場合は何もしない
        if (document.getElementById('loading-screen')) return;
        
        const loadingHTML = `
            <div id="loading-screen" class="loading-screen">
                <div class="loading-content">
                    <div class="loading-ramen">
                        <img src="assets/images/ramen.png" alt="ラーメン" class="loading-ramen-icon" />
                    </div>
                    <div class="loading-text">読み込み中...</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
    }

    initializeStoreMapModal() {
        const mapModal = document.getElementById('map-modal');
        const mapButtons = document.querySelectorAll('.store__map-btn');
        const closeButton = document.querySelector('.map-modal__close');
        const overlay = document.querySelector('.map-modal__overlay');
        const mapContainer = document.getElementById('map-container');
        const mapAddress = document.getElementById('map-address');
        const modalTitle = document.getElementById('map-modal-title');

        if (!mapModal || !mapButtons.length) return;

        // 地図ボタンクリック時の処理
        mapButtons.forEach(button => {
            button.addEventListener('click', () => {
                const storeName = button.getAttribute('data-store');
                const address = button.getAttribute('data-address');
                
                // モーダルタイトルと住所を更新
                modalTitle.textContent = `${this.getStoreDisplayName(storeName)}の地図`;
                mapAddress.textContent = address;
                
                // 地図を表示
                this.showMapInModal(mapContainer, address, storeName);
                
                // モーダルを表示
                mapModal.classList.add('show');
                mapModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        // モーダルを閉じる関数
        const closeModal = () => {
            mapModal.classList.remove('show');
            mapModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        // 閉じるボタンクリック時
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        // オーバーレイクリック時
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }

        // ESCキーで閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mapModal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    getStoreDisplayName(storeCode) {
        const storeNames = {
            'sannomiya': '三宮店',
            'rokkodou': '六甲道店',
            'amagasaki': '尼崎店',
            'kishiwada': '岸和田店',
            'kobe-honten': '神戸総本店',
            'kwansei': '関西学院前店'
        };
        return storeNames[storeCode] || '店舗';
    }

    showMapInModal(container, address, storeCode) {
        // 地図コンテナをクリア
        container.innerHTML = '';
        
        // 住所をエンコード
        const encodedAddress = encodeURIComponent(address);
        
        // 店舗固有の地図URLをチェック
        const storeMapUrls = {
            'sannomiya': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1640.2356277150545!2d135.19245614993892!3d34.69329194429169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008f0031209d93%3A0x483a9c83f97f7a45!2z5rK544Gd44GwIOWkp-mdqeWRvSDkuInlrq7lupc!5e0!3m2!1sja!2sjp!4v1760119505775!5m2!1sja!2sjp',
            'rokkodou': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204.9749541387709!2d135.23940812340163!3d34.71528614154887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008d0007ce3863%3A0x24d0c1024af5acdd!2z5aSn6Z2p5ZG9IOWFreeUsumBk-W6lw!5e0!3m2!1sja!2sjp!4v1760119612227!5m2!1sja!2sjp',
            'amagasaki': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384.1769962732354!2d135.4193229938955!3d34.718651025551296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000efb7cc901f43%3A0x83fdc75478b087ef!2z5aSn6Z2p5ZG9IOWwvOW0juW6lw!5e0!3m2!1sja!2sjp!4v1760119691855!5m2!1sja!2sjp',
            'kishiwada': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.58326900708!2d135.37309757631036!3d34.46272499594349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000c5003f9e691b%3A0x3d7789d42524ac3d!2z5aSn6Z2p5ZG9IOWyuOWSjOeUsOW6lw!5e0!3m2!1sja!2sjp!4v1760119737221!5m2!1sja!2sjp',
            'kobe-honten': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1640.318111356601!2d135.18652699839478!3d34.68912960000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008f13b96f7b6f%3A0x8f455297c4262eda!2z5rK544Gd44GwIOWkp-mdqeWRveelnuaIuOe3j-acrOW6lw!5e0!3m2!1sja!2sjp!4v1760119768446!5m2!1sja!2sjp',
            'kwansei': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.4828759286524!2d135.34698857632003!3d34.76861727956467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f3d352834f8b%3A0xd4a8976a371c42a9!2z5rK544Gd44GwIOWkp-mdqeWRvSDplqLopb_lrabpmaLlpKflrabliY3lupc!5e0!3m2!1sja!2sjp!4v1760119801544!5m2!1sja!2sjp',
            'kinkakuji': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.845407048203!2d135.72945107632856!3d35.03559716516921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60010773445b5339%3A0x84f53f7b45033328!2z5aSn6Z2p5ZG9IOmHkemWo-WvuuW6lw!5e0!3m2!1sja!2sjp!4v1760502438529!5m2!1sja!2sjp'
        };
        
        // 店舗固有の地図URLがある場合はそれを使用
        if (storeMapUrls[storeCode]) {
            const iframe = document.createElement('iframe');
            iframe.src = storeMapUrls[storeCode];
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.style.border = '0';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            iframe.title = `${address}の地図`;
            container.appendChild(iframe);
            return;
        }
        
        // APIキーをチェック
        const apiKey = window.GOOGLE_MAPS_CONFIG?.apiKey;
        
        // APIキーが設定されていない、または無効な場合はフォールバック表示
        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE' || apiKey === 'YOUR_API_KEY') {
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                    <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #333;">${address}</div>
                    <div style="font-size: 0.875rem; color: #999; margin-bottom: 1.5rem; text-align: center;">
                        地図を表示するにはGoogle Maps APIキーが必要です
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodedAddress}" 
                           target="_blank" 
                           style="padding: 0.75rem 1.5rem; background-color: #4285f4; color: white; text-decoration: none; border-radius: 6px; font-size: 0.875rem; font-weight: 500;">
                            Google Mapsで開く
                        </a>
                        <a href="https://console.cloud.google.com/" 
                           target="_blank" 
                           style="padding: 0.75rem 1.5rem; background-color: #f8f9fa; color: #333; text-decoration: none; border: 1px solid #dee2e6; border-radius: 6px; font-size: 0.875rem; font-weight: 500;">
                            APIキーを取得
                        </a>
                    </div>
                </div>
            `;
            return;
        }
        
        // Google Maps Embed APIを使用して地図を埋め込み
        const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;
        
        // 地図のiframeを作成
        const iframe = document.createElement('iframe');
        iframe.src = mapUrl;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = '0';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.title = `${address}の地図`;
        
        // エラー時のフォールバック
        iframe.onerror = () => {
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #333;">地図の読み込みに失敗しました</div>
                    <div style="font-size: 0.875rem; color: #999; margin-bottom: 1.5rem; text-align: center;">
                        APIキーが無効か、ネットワークエラーが発生しています
                    </div>
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodedAddress}" 
                       target="_blank" 
                       style="padding: 0.75rem 1.5rem; background-color: #4285f4; color: white; text-decoration: none; border-radius: 6px; font-size: 0.875rem; font-weight: 500;">
                        Google Mapsで開く
                    </a>
                </div>
            `;
        };
        
        container.appendChild(iframe);
    }
}

// アプリケーションを開始
const app = new App();

// グローバルに公開する必要がある場合は、windowオブジェクトに追加
// window.App = App;