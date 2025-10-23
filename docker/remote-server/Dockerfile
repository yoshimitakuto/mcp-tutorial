FROM node:22-alpine

WORKDIR /app

# プロジェクトルートのpackage.jsonをコピー
COPY package.json ./

# 依存関係をインストール
RUN yarn install --frozen-lockfile

# プロジェクトルートのsrc/remoteディレクトリ全体をコピー
COPY src/remote ./src/remote

# tsconfig.jsonもコピー（ビルドに必要）
COPY tsconfig.json ./

# TypeScriptをビルド
RUN yarn run build:remote

# ビルドされたindex.jsを実行
CMD ["node", "build/remote/index.js"]
