# CV Quality Review Tool

## 📋 概要

**CV品質チェック＆レビューツール** - PowerPoint形式のCVを解析し、品質をチェックして改善提案を生成するWebアプリケーション。

営業担当や現場リーダーから「売れるCV」を作成するための支援ツールです。

---

## ✨ 主な機能

### **Phase 1（ミニマムMVP）**
- ✅ PPT ファイルアップロード＆解析
- ✅ 職務経歴書（参考資料）のアップロード
- ✅ CVガイドラインの自動チェック
  - 上部（略歴）セクション: フォント16pt・2行以内・中央揃え
  - 下部（詳細）セクション: 見出し16pt・詳細14pt・2～3ブロック構成
- ✅ ガイドラインチェック結果の表示
- ✅ FB（フィードバック）コメント自動生成
- ✅ 改善提案リスト表示

### **Phase 2（AI Hub連携）** ※予定
- AI Hubとの統合
- 職務経歴書からの案件ワード自動抽出
- トレンドキーワード提案

### **Phase 3（最適化）** ※予定
- UI/UX改善
- パフォーマンス最適化
- ユーザーフィードバック反映

---

## 🚀 クイックスタート

### 前提条件
- Node.js 16.x 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/saki-nagai/cv-review-tool.git
cd cv-review-tool

# 依存パッケージをインストール
npm install
# または
yarn install
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセス

### 本番ビルド

```bash
npm run build
npm start
```

---

## 📁 プロジェクト構造

```
cv-review-tool/
├── pages/                      # Next.js ページ
│   └── index.tsx              # メインページ
├── components/                # React コンポーネント
│   ├── FileUploadForm.tsx     # ファイルアップロードフォーム
│   └── ReviewResult.tsx       # レビュー結果表示
├── lib/
│   ├── types/                 # TypeScript 型定義
│   │   └── index.ts
│   ├── constants/             # 定数（ガイドライン、カテゴリ等）
│   │   └── guidelines.ts
│   └── utils/                 # ユーティリティ関数
│       ├── pptParser.ts       # PPT解析
│       ├── cvChecker.ts       # ガイドラインチェック
│       └── feedbackGenerator.ts # FB生成
├── styles/                    # CSS ファイル
│   └── globals.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## 🛠️ 技術スタック

| 層 | 技術 |
|---|---|
| **フロントエンド** | Next.js 14 + React 18 + TypeScript |
| **スタイリング** | Tailwind CSS |
| **PPT処理** | pptxjs（後で実装） |
| **HTTP通信** | axios |
| **AI連携** | AI Hub API（Phase 2予定） |
| **デプロイ** | Vercel |

---

## 📋 仕様書

詳細な仕様書は [SPECIFICATION.md](./SPECIFICATION.md) を参照してください。

---

## 🔗 配布方法

### SharePointからのアクセス

Vercelにデプロイ後、以下のリンクをSharePointで共有します：

```
https://cv-review-tool.vercel.app
```

GitHub環境がないユーザーでもブラウザからアクセス可能です。

---

## 📝 使用方法

### 基本フロー

1. **CVファイルをアップロード**
   - PowerPoint形式（.ppt, .pptx）のみ対応

2. **職務経歴書をアップロード（オプション）**
   - PDF、Word、テキスト形式に対応

3. **「CVをレビュー」をクリック**
   - PPTが自動解析される
   - ガイドラインチェックが実行される

4. **レビュー結果を確認**
   - ✅/❌ でガイドライン適合状況を表示
   - FB（フィードバック）コメントを確認
   - 改善提案を参考に修正

5. **別のCVをレビュー**
   - 「別のCVをレビュー」ボタンで再度利用可能

---

## 🎯 ガイドラインルール

### 上部セクション（略歴）

- **フォントサイズ:** 16pt で統一
- **行数:** 2行以内で記載
- **配置:** 中央に揃える

### 下部セクション（詳細）

- **小見出しフォント:** 16pt
- **詳細部分フォント:** 14pt
- **ブロック構成:** 2～3ブロック

---

## 🔄 デプロイ

### Vercelへのデプロイ

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

GitHub連携でAutomatic Deploymentsを有効にすると、mainブランチへのpushで自動デプロイされます。

---

## 🐛 トラブルシューティング

### PPTが解析できない場合

- ファイル形式が .ppt または .pptx であることを確認してください
- ファイルが破損していないか確認してください

### レイアウトが崩れる場合

- ブラウザのキャッシュをクリアしてください
- 別のブラウザで試してください

---

## 📞 サポート

問題や質問がある場合は、GitHubのIssueを作成してください：

https://github.com/saki-nagai/cv-review-tool/issues

---

## 📄 ライセンス

MIT License

---

## 👤 作成者

Saki Nagai

---

## 📅 更新履歴

- **2026-09-06**: プロジェクト初期化、Phase 1 基本機能実装開始
