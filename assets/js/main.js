// メインJavaScriptファイル - モジュール化された機能を統合
import { Navigation } from './modules/navigation.js';
import { Hero } from './modules/hero.js';
import { FormHandler } from './modules/form.js';
import { Utils } from './modules/utils.js';
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
            
            // お知らせページネーション
            this.initializeNewsPagination();
            
            // ローディングアニメーション
            this.initializeLoadingAnimation();
            
            // リサイズイベントの最適化
            this.setupResizeHandler();
            
            console.log('アプリケーションが正常に初期化されました');
        } catch (error) {
            console.error('アプリケーションの初期化中にエラーが発生しました:', error);
        }
    }

    initializeCarousel() {
        console.log('カルーセル初期化を開始...');
        const carouselContainer = document.querySelector('.about__carousel');
        console.log('カルーセルコンテナ:', carouselContainer);
        
        if (carouselContainer) {
            const slides = carouselContainer.querySelectorAll('.about__slide');
            const indicators = carouselContainer.querySelectorAll('.about__indicator');
            console.log('スライド数:', slides.length);
            console.log('インジケーター数:', indicators.length);
            
            this.carousel = new Carousel(carouselContainer);
            
            // ページの可視性変更を監視
            document.addEventListener('visibilitychange', () => {
                this.carousel.handleVisibilityChange();
            });
            
            // グローバルに保存（デバッグ用）
            window.aboutCarousel = this.carousel;
            
            console.log('カルーセルが初期化されました');
        } else {
            console.warn('カルーセルコンテナが見つかりません');
        }
    }

    setupResizeHandler() {
        const handleResize = Utils.debounce(() => {
            // リサイズ時の処理
            console.log('ウィンドウがリサイズされました');
            
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

    initializeNewsPagination() {
        const newsList = document.getElementById('news-list');
        const pagination = document.getElementById('pagination');
        
        if (!newsList || !pagination) return;

        // お知らせデータ
        const newsData = [
            {
                day: '15',
                month: '1月',
                title: 'リニューアルオープンしました！',
                excerpt: '大革命が新たなスタートを切りました。より美味しいまぜ麺と、快適な店内環境でお客様をお迎えいたします。<br>リニューアルを記念して、全店舗で特別キャンペーンを実施中です。ぜひお越しください。',
                category: 'リニューアル'
            },
            {
                day: '10',
                month: '1月',
                title: '新メニュー「肉みそ」登場',
                excerpt: 'ひき肉の肉味噌を使った新作まぜ麺「肉みそ」が全店舗で販売開始となりました。<br>ネギの香りと海苔の風味が絶妙なバランスで、新しい味わいをお楽しみいただけます。',
                category: '新メニュー'
            },
            {
                day: '05',
                month: '1月',
                title: '関西学院前店の営業時間変更のお知らせ',
                excerpt: '関西学院前店の営業開始時間を10:30に変更いたします。<br>学生の皆様により早い時間からご利用いただけるよう、営業時間を調整いたしました。',
                category: '営業時間'
            },
            {
                day: '28',
                month: '12月',
                title: '年末年始の営業について',
                excerpt: '年末年始の営業についてお知らせいたします。<br>12月31日（日）：全店舗 通常営業、1月1日（月）：全店舗 休業、1月2日（火）以降：通常営業',
                category: '営業時間'
            },
            {
                day: '20',
                month: '12月',
                title: '公式Instagramアカウント開設',
                excerpt: '大革命の公式Instagramアカウントを開設いたしました。<br>最新のメニュー情報や店舗の様子を随時更新しております。ぜひフォローしてください。',
                category: 'SNS'
            },
            {
                day: '15',
                month: '12月',
                title: '岸和田店オープン記念キャンペーン',
                excerpt: '岸和田店のオープンを記念して、特別キャンペーンを実施いたします。<br>期間中、まぜ麺メニューを注文されたお客様に、サイドメニューを1品サービスいたします。',
                category: 'キャンペーン'
            },
            {
                day: '10',
                month: '12月',
                title: '冬季限定メニューの販売開始',
                excerpt: '寒い冬にぴったりの「特製とんこつまぜ麺」が期間限定で販売開始となりました。<br>濃厚なとんこつスープと特製の具材で、心も体も温まる一杯をお楽しみください。',
                category: '期間限定'
            },
            {
                day: '05',
                month: '12月',
                title: '神戸総本店のリニューアル工事について',
                excerpt: '神戸総本店のリニューアル工事のため、12月10日から12月20日まで臨時休業いたします。<br>工事完了後は、より快適な店内環境でお客様をお迎えいたします。',
                category: '店舗情報'
            },
            {
                day: '30',
                month: '11月',
                title: '六甲道店の営業時間延長のお知らせ',
                excerpt: '六甲道店の営業時間を22:00まで延長いたします。<br>お仕事帰りのお客様にもご利用いただけるよう、営業時間を調整いたしました。',
                category: '営業時間'
            },
            {
                day: '25',
                month: '11月',
                title: '感謝祭キャンペーンの実施',
                excerpt: 'お客様への感謝を込めて、特別キャンペーンを実施いたします。<br>期間中、まぜ麺メニューを注文されたお客様に、ドリンクを1杯サービスいたします。',
                category: 'キャンペーン'
            },
            {
                day: '20',
                month: '11月',
                title: '新店舗「尼崎店」オープンのお知らせ',
                excerpt: '尼崎市に新店舗「尼崎店」がオープンいたします。<br>オープン記念として、初回来店のお客様に特別メニューをプレゼントいたします。',
                category: '新店舗'
            },
            {
                day: '15',
                month: '11月',
                title: '公式LINEアカウント開設',
                excerpt: '大革命の公式LINEアカウントを開設いたしました。<br>最新情報やお得なクーポン情報を配信いたします。ぜひ友だち追加してください。',
                category: 'SNS'
            }
        ];

        const itemsPerPage = 4;
        let currentPage = 1;
        const totalPages = Math.ceil(newsData.length / itemsPerPage);

        // URLパラメータから現在のページを取得
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        if (pageParam && pageParam >= 1 && pageParam <= totalPages) {
            currentPage = parseInt(pageParam);
        }

        // お知らせアイテムを生成
        function generateNewsItem(item) {
            return `
                <article class="news-item">
                    <div class="news-item__date">
                        <span class="news-item__date-day">${item.day}</span>
                        <span class="news-item__date-month">${item.month}</span>
                    </div>
                    <div class="news-item__content">
                        <h3 class="news-item__title">${item.title}</h3>
                        <p class="news-item__excerpt">${item.excerpt}</p>
                    </div>
                    <div class="news-item__category">
                        <span class="news-item__category-tag">${item.category}</span>
                    </div>
                </article>
            `;
        }

        // ページネーションを生成
        function generatePagination() {
            let paginationHTML = '';
            
            // 前へボタン
            if (currentPage > 1) {
                paginationHTML += `<a href="?page=${currentPage - 1}" class="pagination__link">前へ</a>`;
            } else {
                paginationHTML += `<a href="#" class="pagination__link pagination__link--disabled">前へ</a>`;
            }

            // ページ番号
            for (let i = 1; i <= totalPages; i++) {
                if (i === currentPage) {
                    paginationHTML += `<a href="?page=${i}" class="pagination__link pagination__link--active">${i}</a>`;
                } else {
                    paginationHTML += `<a href="?page=${i}" class="pagination__link">${i}</a>`;
                }
            }

            // 次へボタン
            if (currentPage < totalPages) {
                paginationHTML += `<a href="?page=${currentPage + 1}" class="pagination__link">次へ</a>`;
            } else {
                paginationHTML += `<a href="#" class="pagination__link pagination__link--disabled">次へ</a>`;
            }

            return paginationHTML;
        }

        // 現在のページのお知らせを表示
        function displayCurrentPage() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentPageData = newsData.slice(startIndex, endIndex);

            newsList.innerHTML = currentPageData.map(generateNewsItem).join('');
            pagination.innerHTML = generatePagination();
        }

        // 初期表示
        displayCurrentPage();

        // ページネーションリンクのクリックイベント
        pagination.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (e.target.classList.contains('pagination__link--disabled')) {
                return;
            }

            const href = e.target.getAttribute('href');
            if (href && href !== '#') {
                const pageMatch = href.match(/page=(\d+)/);
                if (pageMatch) {
                    currentPage = parseInt(pageMatch[1]);
                    displayCurrentPage();
                    
                    // URLを更新（履歴に追加しない）
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set('page', currentPage);
                    window.history.replaceState({}, '', newUrl);
                    
                    // ページトップにスクロール
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
            
            // イベントの伝播を停止してローディング制御を回避
            e.stopPropagation();
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
                console.log('同じHTMLファイルへのリンクのため、ローディングを表示しません:', {
                    current: currentFileName,
                    target: targetFileName,
                    href: href
                });
                return;
            }
            
            // お知らせページのページネーションリンクは除外
            if (href.includes('?page=') && currentFileName === 'news.html') {
                console.log('お知らせページのページネーションのため、ローディングを表示しません:', href);
                return;
            }
            
            console.log('異なるHTMLファイルへのリンクのため、ローディングを表示します:', {
                current: currentFileName,
                target: targetFileName,
                href: href
            });
            
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
}

// アプリケーションを開始
const app = new App();

// グローバルに公開する必要がある場合は、windowオブジェクトに追加
// window.App = App;