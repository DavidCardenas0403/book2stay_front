export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: ["en", "es", "ca", "fr", "nl"],
  messages: {
    en: {
      welcome: "Welcome",
    },
    fr: {
      welcome: "Bienvenue",
    },
  },
}));
