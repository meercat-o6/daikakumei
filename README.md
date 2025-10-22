# 大革命 (DAIKAKUMEI) - あえ麺専門店ウェブサイト

神戸・大阪を中心に展開するあえ麺専門店「大革命」の公式ウェブサイトです。

## 🍜 プロジェクト概要

- **店舗数**: 6店舗（神戸・大阪エリア）
- **メインメニュー**: 釜玉、肉みそなど
- **技術スタック**: HTML5, CSS3 (SCSS), JavaScript (ES6+)

## 📁 プロジェクト構造

```
daikakumei/
├── assets/
│   ├── css/                 # スタイルシート
│   │   ├── style.scss      # メインSCSSファイル
│   │   ├── _variables.scss # 変数定義
│   │   ├── _mixins.scss    # ミックスイン
│   │   ├── _base.scss      # ベーススタイル
│   │   ├── _components.scss# コンポーネント
│   │   ├── _layout.scss    # レイアウト
│   │   └── _pages.scss     # ページ固有スタイル
│   ├── js/                 # JavaScript
│   │   ├── main.js         # メインJSファイル
│   │   ├── modules/        # 機能別モジュール
│   │   │   ├── navigation.js
│   │   │   ├── hero.js
│   │   │   ├── form.js
│   │   │   ├── utils.js
│   │   │   ├── news.js
│   │   │   └── news-detail.js
│   │   └── data/           # データファイル
│   │       └── news-data.js
│   └── images/             # 画像ファイル
│       ├── hero/           # ヒーロー画像
│       ├── menu/           # メニュー画像
│       ├── stores/         # 店舗画像
│       └── icons/          # アイコン
├── includes/               # 共通HTMLコンポーネント
│   ├── header.html
│   ├── footer.html
│   └── head.html
├── *.html                  # 各ページのHTMLファイル
├── package.json
└── README.md
```

## 🚀 セットアップ

### 必要な環境
- Node.js (v16以上)
- npm または yarn

### インストール
```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動（SCSSの監視 + ローカルサーバー）
npm run dev

# または個別に実行
npm run watch:css  # SCSSの監視
npm run serve      # ローカルサーバー起動
```

## 📝 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動（SCSS監視 + ローカルサーバー） |
| `npm run build` | 本番用ビルド |
| `npm run build:css` | CSSの本番用ビルド |
| `npm run watch:css` | SCSSファイルの監視 |
| `npm run serve` | ローカルサーバー起動 |
| `npm run lint:css` | CSS/SCSSのリント |
| `npm run lint:js` | JavaScriptのリント |
| `npm run format` | コードフォーマット |
| `npm run clean` | ビルドファイルの削除 |

## 🎨 スタイルガイド

### SCSS構造
- **変数**: カラー、フォント、スペーシングなど
- **ミックスイン**: レスポンシブ、フレックスボックス、グリッドなど
- **ベース**: リセットCSS、ユーティリティクラス
- **コンポーネント**: ボタン、フォーム、カードなど
- **レイアウト**: ヘッダー、フッター、ナビゲーション
- **ページ**: 各ページ固有のスタイル

### レスポンシブブレークポイント
- **モバイル**: 768px未満
- **タブレット**: 768px - 1023px
- **デスクトップ**: 1024px以上

## 🔧 開発ガイドライン

### HTML
- セマンティックなHTML5要素を使用
- アクセシビリティを考慮した構造
- SEO最適化

### CSS/SCSS
- BEM記法を使用
- モバイルファーストのレスポンシブデザイン
- 変数とミックスインを活用

### JavaScript
- ES6+のモジュールシステムを使用
- 機能別にモジュール化
- エラーハンドリングを適切に実装

## 📱 対応ブラウザ

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- iOS Safari (最新版)
- Android Chrome (最新版)

## 🏪 店舗情報

### 神戸エリア
- **三宮店**: 兵庫県神戸市中央区北長狭通１丁目３０−２６
- **六甲道店**: 兵庫県神戸市灘区深田町３丁目３−１２
- **神戸総本店**: 兵庫県神戸市中央区元町通１丁目８−１４
- **関西学院前店**: 兵庫県西宮市上甲東園３丁目９−１

### 大阪エリア
- **尼崎店**: 兵庫県尼崎市西大物町１２−４１
- **岸和田店**: 大阪府岸和田市五軒屋町１５−１６

## 📄 ライセンス

ISC License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。

## 📞 お問い合わせ

- **ウェブサイト**: [大革命公式サイト](https://github.com/meercat-o6/daikakumei)
- **GitHub**: [meercat-o6/daikakumei](https://github.com/meercat-o6/daikakumei)