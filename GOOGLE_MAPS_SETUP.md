# Google Maps API設定ガイド

## 1. Google Cloud ConsoleでAPIキーを取得

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. 「APIとサービス」→「ライブラリ」に移動
4. 「Maps Embed API」を検索して有効化
5. 「APIとサービス」→「認証情報」に移動
6. 「認証情報を作成」→「APIキー」を選択
7. 作成されたAPIキーをコピー

## 2. APIキーを設定

`config.js`ファイルを開いて、以下のように設定してください：

```javascript
window.GOOGLE_MAPS_CONFIG = {
    apiKey: 'ここにあなたのAPIキーを入力'
};
```

## 3. セキュリティ設定（推奨）

本番環境では、APIキーの使用を制限することをお勧めします：

1. Google Cloud Consoleの「APIとサービス」→「認証情報」
2. 作成したAPIキーをクリック
3. 「アプリケーションの制限」で「HTTPリファラー」を選択
4. あなたのドメインを追加（例：`https://yourdomain.com/*`）

## 4. 料金について

- Maps Embed APIは月間25,000リクエストまで無料
- それ以上は従量課金制
- 詳細は[Google Maps Platform料金](https://cloud.google.com/maps-platform/pricing)を確認

## トラブルシューティング

- APIキーが正しく設定されているか確認
- Maps Embed APIが有効化されているか確認
- ブラウザのコンソールでエラーメッセージを確認
