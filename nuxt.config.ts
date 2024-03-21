// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/aura-light-blue/theme.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: ["nuxt-primevue", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
    },
    components: {
      include: "*",
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
