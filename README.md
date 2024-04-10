# News Portal

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.



## build Container image and run
```
docker  build --build-arg="API_BASE_URL=http://news-api-server:3000" -t  asia.gcr.io/sunmedia-341405/news-portal:v0.0.1 -f ./docker/Dockerfile .

docker  build --build-arg="API_BASE_URL=https://staging.sunmedia.tw" -t  asia.gcr.io/sunmedia-341405/news-portal:v0.0.1 -f ./docker/Dockerfile .

docker run -it -p 8001:3000 news-portal:latest
```
