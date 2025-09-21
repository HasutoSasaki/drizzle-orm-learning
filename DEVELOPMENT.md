# 開発の流れ

## PostgreSQL の起動・停止

```bash
# 開発開始時
brew services start postgresql

# 開発終了時
brew services stop postgresql
```

## 開発手順

1. PostgreSQL を起動
2. データベース作成・マイグレーション実行
3. 開発作業
4. 作業終了後に PostgreSQL を停止

## 便利なコマンド

```bash
# サービス状態確認
brew services list | grep postgresql

# Drizzle マイグレーション
npm run db:migrate

# Drizzle Studio (DB管理UI)
npm run db:studio
```