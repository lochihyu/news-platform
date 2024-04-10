# 使用 golang alpine 做為建置階段的基底 image
FROM node:20-alpine3.18 AS builder

ARG API_BASE_URL=http://192.168.8.252:8080
# 設置工作目錄
WORKDIR /workspace

# 安裝 gcc 和其他必要的依賴項目
# go alpine 版本不包含這些項目
RUN apk add --no-cache git make gcc musl-dev
RUN apk update && apk upgrade --available && apk add build-base

# 複製你的 go 程式碼到 container 中
COPY . .

RUN npm install

RUN API_BASE_URL=$API_BASE_URL npm run build

# 創建最終階段的基底 image
FROM node:20-alpine

# 系統更新
RUN apk update && apk upgrade --available

# 更換工作目錄到 /app
WORKDIR /app/

# 從建置階段的 image 複製 binary 到最終階段的 image 中
COPY --from=builder /workspace/.output /app/.output

# 開放你的應用程式使用的 port
EXPOSE 3000

# 不存在的使用者
USER 1001

# 設定容器啟動時執行的指令
CMD ["node", ".output/server/index.mjs"]
