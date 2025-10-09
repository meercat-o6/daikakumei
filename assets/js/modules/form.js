// フォーム関連の機能
export class FormHandler {
    constructor() {
        this.contactForm = document.querySelector('.contact__form');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.setupFormSubmission();
        }
    }

    // フォームの送信処理
    setupFormSubmission() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    handleFormSubmit() {
        // フォームデータを取得
        const formData = new FormData(this.contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // バリデーション
        if (this.validateForm(formObject)) {
            this.submitForm(formObject);
        }
    }

    validateForm(formData) {
        // 基本的なバリデーション
        const requiredFields = ['name', 'email', 'message'];
        
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                this.showError(`${field}は必須項目です`);
                return false;
            }
        }

        // メールアドレスの形式チェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showError('有効なメールアドレスを入力してください');
            return false;
        }

        return true;
    }

    submitForm(formData) {
        // 送信処理（実際の実装では適切なエンドポイントに送信）
        console.log('フォーム送信:', formData);
        
        // 送信完了メッセージ
        this.showSuccess('お問い合わせありがとうございます。内容を確認の上、返信いたします。');
        
        // フォームをリセット
        this.contactForm.reset();
    }

    showError(message) {
        // エラーメッセージの表示
        alert(`エラー: ${message}`);
    }

    showSuccess(message) {
        // 成功メッセージの表示
        alert(message);
    }
}
