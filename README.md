# 大革命 (DAIKAKUMEI) - ラーメン店ウェブサイト

神戸・大阪を中心に展開するラーメン店「大革命」の公式ウェブサイトです。

## 🍜 プロジェクト概要

- **店舗数**: 6店舗（神戸・大阪エリア）
- **メインメニュー**: 釜玉、肉みそ、ちょい飯、ポテカラなど
- **技術スタック**: HTML5, CSS3, JavaScript (ES6+)
- **SEO最適化**: 構造化データ、サイトマップ、Google Search Console対応
- **レスポンシブ対応**: モバイル・タブレット・デスクトップ対応

## 📁 プロジェクト構造

```
daikakumei/
├── assets/
│   ├── css/                 # スタイルシート
│   │   ├── style.css       # メインCSSファイル
│   │   ├── news.css        # お知らせページ専用
│   │   ├── stores.css      # 店舗情報ページ専用
│   │   └── careers.css     # 採用情報ページ専用
│   ├── js/                 # JavaScript
│   │   ├── main.js         # メインJSファイル
│   │   ├── modules/        # 機能別モジュール
│   │   │   ├── navigation.js
│   │   │   ├── hero.js
│   │   │   ├── form.js
│   │   │   ├── utils.js
│   │   │   ├── news.js
│   │   │   ├── news-detail.js
│   │   │   └── carousel.js
│   │   └── data/           # データファイル
│   │       └── news-data.js
│   ├── images/             # 画像ファイル
│   │   ├── hero/           # ヒーロー画像
│   │   ├── menu/           # メニュー画像
│   │   ├── stores/         # 店舗画像
│   │   ├── icons/          # アイコン
│   │   └── video/          # 動画ファイル
│   └── scss/               # SCSSソースファイル
├── includes/               # 共通HTMLコンポーネント
│   ├── header.html
│   ├── footer.html
│   ├── head.html
│   └── common-scripts.html
├── *.html                  # 各ページのHTMLファイル
├── sitemap.xml            # SEO用サイトマップ
├── robots.txt             # 検索エンジン向け設定
├── google*.html           # Google Search Console認証
├── favicon.ico            # ファビコン
├── CNAME                  # カスタムドメイン設定
├── package.json
└── README.md
```

## 🚀 セットアップ

### 必要な環境
- Node.js (v16以上)
- npm または yarn
- Python 3 (ローカルサーバー用)

**注意**: このプロジェクトはSCSSを使用し、コンパイルしてCSSファイルを生成します。

### インストール
```bash
# 依存関係をインストール
npm install

# 開発サーバー起動（SCSS監視 + ローカルサーバー）
npm run dev

# または個別に実行
npm run watch:css  # SCSSの監視
npm run serve      # ローカルサーバー起動

# ローカルサーバー（Python）
python3 -m http.server 8000
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
- **変数**: `_variables.scss` - カラー、フォント、スペーシングなど
- **ミックスイン**: `_mixins.scss` - レスポンシブ、フレックスボックス、グリッドなど
- **ベース**: `_base.scss` - リセットCSS、ユーティリティクラス
- **コンポーネント**: `_components.scss` - ボタン、フォーム、カードなど
- **レイアウト**: `_layout.scss` - ヘッダー、フッター、ナビゲーション
- **ページ**: `_pages.scss` - 各ページ固有のスタイル
- **メイン**: `style.scss` - 上記ファイルをインポート

### レスポンシブブレークポイント
- **モバイル**: 767px以下
- **デスクトップ**: 768px以上

### カラーパレット
- **メインカラー**: #ffd700 (ゴールド)
- **背景**: #000000 (ブラック)
- **テキスト**: #ffffff (ホワイト)
- **セカンダリ**: #cccccc (ライトグレー)

## 🔧 開発ガイドライン

### HTML
- セマンティックなHTML5要素を使用
- アクセシビリティを考慮した構造
- SEO最適化（メタタグ、構造化データ）

### CSS/SCSS
- BEM記法を使用
- モバイルファーストのレスポンシブデザイン
- 変数とミックスインを活用

### JavaScript
- ES6+のモジュールシステムを使用
- 機能別にモジュール化
- エラーハンドリングを適切に実装
- カルーセル、フォーム、ナビゲーション機能

## 🔍 SEO対策

### 実装済み機能
- **構造化データ**: JSON-LD形式でレストラン情報を提供
- **サイトマップ**: `sitemap.xml`で全ページを検索エンジンに通知
- **robots.txt**: 検索エンジンクローラーへの指示
- **メタタグ最適化**: タイトル、説明文、キーワードの最適化
- **Google Search Console**: 認証済み、パフォーマンス監視可能

### ターゲットキーワード
- 神戸ラーメン
- 大阪ラーメン
- 大革命ラーメン
- 大革命

## 📱 対応ブラウザ

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- iOS Safari (最新版)
- Android Chrome (最新版)

## 🏪 店舗情報

### 神戸・兵庫エリア
- **三宮店**: 兵庫県神戸市中央区北長狭通１丁目３０−２６
- **六甲道店**: 兵庫県神戸市灘区深田町３丁目３−１２
- **神戸総本店**: 兵庫県神戸市中央区元町通１丁目８−１４
- **関西学院前店**: 兵庫県西宮市上甲東園３丁目９−１
- **尼崎店**: 兵庫県尼崎市西大物町１２−４１

### 大阪エリア
- **岸和田店**: 大阪府岸和田市五軒屋町１５−１６

## 📄 ライセンス

ISC License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。

## 📞 お問い合わせ

- **ウェブサイト**: [大革命公式サイト](https://daikakumei.com)
- **Instagram**: [@daikakumei_info](https://www.instagram.com/daikakumei_info/)
- **採用担当**: 090-4271-7088 (平日 11:00〜18:00)
- **GitHub**: [meercat-o6/daikakumei](https://github.com/meercat-o6/daikakumei)

## 🚀 デプロイ

- **本番環境**: GitHub Pages
- **カスタムドメイン**: daikakumei.com
- **自動デプロイ**: mainブランチへのプッシュで自動更新