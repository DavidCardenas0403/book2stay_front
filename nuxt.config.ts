// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'primeicons/primeicons.css',
  ],
  modules: ['nuxt-primevue', '@nuxtjs/i18n', 'nuxt-vue3-google-signin'],
  googleSignIn: {
    clientId:
      '986843791144-8ep38s50blm3n4tmguk5aahi5touom0o.apps.googleusercontent.com',
  },
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
    host: '0',
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      title: 'Book2Stay',
      script: [
        {
          src: 'https://www.paypal.com/sdk/js?client-id=BAAvM3hP8mb481aadBMRwILVlKb_DgNIpsDCbXwELna7Nu6tbpjvm89TkMS3KldzyrRUE3AkT9QV70OUo8&components=hosted-buttons&disable-funding=venmo&currency=EUR',
          crossorigin: 'anonymous',
          async: true,
        },
      ],
    },
  },
  ssr: false,
})
