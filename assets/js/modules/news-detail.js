// お知らせ詳細ページの機能
import { newsDetailData } from '../data/news-data.js';

export class NewsDetailManager {
    constructor() {
        this.init();
    }

    init() {
        // URLパラメータからIDを取得
        const urlParams = new URLSearchParams(window.location.search);
        const newsId = urlParams.get('id');
        
        if (newsId && newsDetailData[newsId]) {
            this.displayNewsDetail(newsDetailData[newsId]);
        } else {
            this.displayNotFound();
        }
    }

    displayNewsDetail(newsItem) {
        const newsDetail = document.getElementById('news-detail');
        if (!newsDetail) return;

        newsDetail.innerHTML = `
            <div class="news-detail__header">
                <a href="news.html" class="news-detail__back">← お知らせ一覧に戻る</a>
                <div class="news-detail__date">
                    <span class="news-detail__date-month">${newsItem.month}</span>
                </div>
            </div>
            <div class="news-detail__content">
                <h1 class="news-detail__title">${newsItem.title}</h1>
                <div class="news-detail__category">
                    <span class="news-detail__category-tag">${newsItem.category}</span>
                </div>
                <div class="news-detail__body">
                    ${newsItem.body}
                </div>
            </div>
        `;
    }

    displayNotFound() {
        const newsDetail = document.getElementById('news-detail');
        if (!newsDetail) return;

        newsDetail.innerHTML = `
            <div class="news-detail__header">
                <a href="news.html" class="news-detail__back">← お知らせ一覧に戻る</a>
            </div>
            <div class="news-detail__content">
                <h1 class="news-detail__title">お知らせが見つかりません</h1>
                <div class="news-detail__body">
                    <p>指定されたお知らせが見つかりませんでした。</p>
                    <p><a href="news.html">お知らせ一覧に戻る</a></p>
                </div>
            </div>
        `;
    }
}
