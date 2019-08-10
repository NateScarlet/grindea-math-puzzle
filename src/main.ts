import { Button, Input, InputNumber } from 'element-ui';
import ElementLocale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import Vue, { VNode } from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import i18n from './i18n';
import './registerServiceWorker';
Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
ElementLocale.i18n(
  (key: string, value: VueI18n.LocaleMessages): VueI18n.TranslateResult =>
    i18n.t(key, value)
);

new Vue({
  i18n,
  render: (h): VNode => h(App),
}).$mount('#app');

document.title = i18n.t('project-name').toString();
