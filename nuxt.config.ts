// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'primevue/resources/themes/aura-light-blue/theme.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'primeicons/primeicons.css',
  ],
  modules: ['nuxt-primevue', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
    langDir: './lang',
    lazy: true,
    locales: [
      {
        code: 'es',
        file: 'es.json',
      },
      {
        code: 'ca',
        file: 'ca.json',
      },
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'fr',
        file: 'fr.json',
      },
      {
        code: 'nl',
        file: 'nl.json',
      },
    ],
  },
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
    },
    components: {
      include: '*',
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer: {
    port: 8000,
  },
  ssr: false,
})
