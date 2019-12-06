import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';

export const supportedLanguages = ['en', 'zh'];
export const locale = ((): string => {
  if (supportedLanguages.includes(navigator.language)) {
    return navigator.language;
  }
  if (navigator.languages) {
    const ret = navigator.languages.find((i): boolean =>
      supportedLanguages.includes(i)
    );
    if (ret) {
      return ret;
    }
  }
  return process.env.VUE_APP_I18N_LOCALE || 'en';
})();

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: LocaleMessages = {};
  locales.keys().forEach((key): void => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
      if (key === 'en') {
        messages[locale] = { ...messages[locale], ...enLocale };
      }
      if (key === 'zh') {
        messages[locale] = { ...messages[locale], ...zhLocale };
      }
    }
  });
  return messages;
}

export default new VueI18n({
  locale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
