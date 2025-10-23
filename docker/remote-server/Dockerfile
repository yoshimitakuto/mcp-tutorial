FROM node:22-alpine

WORKDIR /app

# プロジェクトルートのpackage.jsonをコピー
COPY package.json ./

# 依存関係をインストール
RUN yarn install --frozen-lockfile

# プロジェクトルートのsrcディレクトリ全体をコピー
COPY src ./src

# tsconfig.jsonもコピー（ビルドに必要）
COPY tsconfig.json ./

# TypeScriptをビルド
RUN yarn run build

# ビルドされたindex.jsを実行
CMD ["node", "build/index.js"]
