// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/aura-light-blue/theme.css",
    '@fortawesome/fontawesome-svg-core/styles.css',
    'primeicons/primeicons.css'
  ],
  modules: ["nuxt-primevue"],
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
