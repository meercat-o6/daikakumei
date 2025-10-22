// お知らせ関連の機能
import { newsData } from '../data/news-data.js';

export class NewsManager {
    constructor() {
        this.newsList = document.getElementById('news-list');
        this.pagination = document.getElementById('pagination');
        this.itemsPerPage = 4;
        this.currentPage = 1;
        this.totalPages = Math.ceil(newsData.length / this.itemsPerPage);
        
        if (this.newsList && this.pagination) {
            this.init();
        }
    }

    init() {
        // URLパラメータから現在のページを取得
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        if (pageParam && pageParam >= 1 && pageParam <= this.totalPages) {
            this.currentPage = parseInt(pageParam);
        }

        this.displayCurrentPage();
        this.setupPaginationEvents();
    }

    // お知らせアイテムを生成
    generateNewsItem(item) {
        return `
            <article class="news-item" onclick="window.location.href='news-detail.html?id=${item.id}'" style="cursor: pointer;">
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
    generatePagination() {
        let paginationHTML = '';
        
        // 前へボタン
        if (this.currentPage > 1) {
            paginationHTML += `<a href="?page=${this.currentPage - 1}" class="pagination__link">前へ</a>`;
        } else {
            paginationHTML += `<a href="#" class="pagination__link pagination__link--disabled">前へ</a>`;
        }

        // ページ番号
        for (let i = 1; i <= this.totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<a href="?page=${i}" class="pagination__link pagination__link--active">${i}</a>`;
            } else {
                paginationHTML += `<a href="?page=${i}" class="pagination__link">${i}</a>`;
            }
        }

        // 次へボタン
        if (this.currentPage < this.totalPages) {
            paginationHTML += `<a href="?page=${this.currentPage + 1}" class="pagination__link">次へ</a>`;
        } else {
            paginationHTML += `<a href="#" class="pagination__link pagination__link--disabled">次へ</a>`;
        }

        return paginationHTML;
    }

    // 現在のページのお知らせを表示
    displayCurrentPage() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentPageData = newsData.slice(startIndex, endIndex);

        this.newsList.innerHTML = currentPageData.map(item => this.generateNewsItem(item)).join('');
        this.pagination.innerHTML = this.generatePagination();
    }

    // ページネーションイベントの設定
    setupPaginationEvents() {
        this.pagination.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (e.target.classList.contains('pagination__link--disabled')) {
                return;
            }

            const href = e.target.getAttribute('href');
            if (href && href !== '#') {
                const pageMatch = href.match(/page=(\d+)/);
                if (pageMatch) {
                    this.currentPage = parseInt(pageMatch[1]);
                    this.displayCurrentPage();
                    
                    // URLを更新（履歴に追加しない）
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set('page', this.currentPage);
                    window.history.replaceState({}, '', newUrl);
                }
            }
        });
    }
}
