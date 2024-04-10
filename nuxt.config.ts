// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "商傳媒",
      titleTemplate: "%s | 台灣最專業的商業、金融、科技與財經新聞頻道",
    },
  },
  modules: ["nuxt-schema-org", "nuxt-quasar-ui", "dayjs-nuxt"],
  css: ["~/assets/css/main.css", "~/assets/css/slide.css"],
  quasar: {
    cssAddon: true,
    extras: {
      fontIcons: ["mdi-v7"],
    },
    plugins: ["Notify"],
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      defaultTitle: "商傳媒",
    },
  },
  router: {
    extendRoutes(routes: any, resolve: any) {
      routes.push({
        path: "/",
        component: resolve(__dirname, "pages/index.vue"),
      });
    },
  },
  dayjs: {
    locales: ["zh-tw", "en"],
    plugins: ["relativeTime", "utc", "timezone", "localizedFormat"],
    defaultLocale: "zh-tw",
    defaultTimezone: "Asia/Taipei",
  },
});
