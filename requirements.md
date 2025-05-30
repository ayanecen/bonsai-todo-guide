# 🌱 盆栽ToDo アプリ要件定義書 💚

## 📋 プロジェクト概要

**アプリ名:** 盆栽ToDo（ぼんさいトゥードゥー）  
**目的:** 盆栽初心者〜中級者が、盆栽の種類と育成場所を入力するだけで、季節に合った育成ToDoリストを取得できるアプリ

## 👥 ターゲットユーザー

- 盆栽初心者〜中級者
- 盆栽の知識に自信がない人
- スマホ中心で利用する人

## 🌟 主要機能要件

### 入力機能
- 樹木名（盆栽の種類）入力フォーム
- 生育地（地域名）入力フォーム
- 現在地自動取得ボタン
- 月選択プルダウン
- 今月自動設定ボタン
- ToDo生成ボタン

### 処理機能
- 地域名から気候区分判定（寒冷地・温暖地・亜熱帯）
- 気候区分による季節調整（地域差の反映）
- 樹木種別ごとの季節別ToDo生成

### 出力機能
- 盆栽基本情報の表示（樹種・地域・月・季節）
- ToDo項目のカード形式表示
- ToDo詳細説明の表示
- レスポンシブデザイン（スマホ対応）

### 樹木データ管理機能
- カスタム樹木データの追加機能
- 追加した樹木データの編集・削除機能
- データの永続化（ローカルストレージ）
- カスタムデータのインポート・エクスポート機能
- 樹木ごとのToDo情報管理（季節別）
- 樹木の画像アップロード・表示機能

## 💻 技術要件

- **フロントエンド:** HTML5, CSS3, JavaScript（バニラJS）
- **デザイン:** レスポンシブデザイン、モバイルファースト
- **データ管理:** クライアントサイドのみ（サーバー不要）
- **実行環境:** 主要Webブラウザ（Chrome, Firefox, Safari, Edge）
- **データ永続化:** LocalStorage/IndexedDB

## 📊 非機能要件

- **パフォーマンス:** 入力から表示まで1秒以内
- **アクセシビリティ:** 視認性の高い色使い・フォント
- **セキュリティ:** 個人情報の非収集
- **オフライン対応:** インターネット接続なしでも動作可能
- **データ容量:** ローカルストレージの容量制限内での動作（5MB程度）

## 📱 対応デバイス

- スマートフォン（優先）
- タブレット
- デスクトップPC

## ❤️ UX要件

- シンプルな操作性
- 見やすいカードUI
- 入力補助機能（候補表示・自動入力）
- スムーズなスクロール遷移
- カスタムデータ管理の直感的なUI

---

# ✅ 開発チェックリスト

## 🔰 初期設定・共通
- [x] プロジェクトフォルダ構成の作成
- [x] HTML基本構造の作成
- [x] CSSの基本設定（変数・リセット）
- [x] レスポンシブデザインの基本設定
- [x] フォントの設定（Noto Sans JP）

## 💎 UI実装
- [x] ヘッダーセクションのデザイン
- [x] 入力フォームセクションの作成
- [x] 結果表示セクションの作成
- [x] フッターセクションの作成
- [x] カードデザインの実装
- [x] アニメーション効果の追加
- [x] モバイル対応レイアウトの調整
- [ ] 樹木データ管理UIの実装

## 🧠 データ設計
- [x] 気候区分データの定義
- [x] 季節定義データの作成
- [x] 樹木ごとのToDoデータの作成（黒松、もみじ、梅、五葉松）
- [x] デフォルトToDoデータの作成（未登録樹種用）
- [ ] カスタム樹木データ構造の設計
- [ ] LocalStorageデータ保存形式の設計

## ⚙️ ロジック実装
- [x] DOM要素取得とイベントリスナー設定
- [x] 今月の自動取得機能
- [x] フォーム送信処理
- [x] 地域名から気候区分判定機能
- [x] 気候区分による季節調整機能
- [x] ToDo生成機能
- [x] 盆栽情報表示機能
- [x] ToDoリスト表示機能
- [x] 現在地取得機能
- [x] 樹木名候補表示機能
- [ ] カスタム樹木データの追加機能
- [ ] カスタム樹木データの編集・削除機能
- [ ] データの永続化（LocalStorage）
- [ ] データのインポート・エクスポート機能

## 📋 基本機能テスト
- [ ] 各ブラウザでの表示確認
- [ ] スマホ・タブレットでの表示確認
- [ ] 入力バリデーションの動作確認
- [ ] ToDo生成処理の正確性確認
- [ ] 現在地取得機能の動作確認
- [ ] 今月自動設定の動作確認
- [ ] カスタムデータ追加・編集・削除機能の動作確認
- [ ] LocalStorageデータ保存・読み込み確認

## 🚀 将来の拡張ポイント
- [ ] ユーザー登録・マイ盆栽管理機能
- [ ] カレンダー連携・リマインダー機能
- [ ] SNSシェア機能
- [ ] 盆栽写真アップロード・記録機能
- [ ] 育成日記機能
- [ ] 実際の気象データAPI連携
- [ ] 樹種検索の改善（オートコンプリート強化）
- [ ] クラウド同期機能
- [ ] コミュニティによる樹木データ共有機能 