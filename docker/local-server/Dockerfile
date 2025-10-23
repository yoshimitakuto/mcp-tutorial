FROM node:22-alpine

WORKDIR /app

# プロジェクトルートのpackage.jsonをコピー
COPY package.json ./

# 依存関係をインストール
RUN yarn install --frozen-lockfile

# プロジェクトルートのsrc/localディレクトリ全体をコピー
COPY src/local ./src/local

# tsconfig.jsonもコピー（ビルドに必要）
COPY tsconfig.json ./

# TypeScriptをビルド
RUN yarn run build:local
  
# ビルドされたindex.jsを実行
CMD ["node", "build/local/index.js"]
