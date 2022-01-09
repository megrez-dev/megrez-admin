import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import TDesign from 'tdesign-vue'
import {
  MessagePlugin,
  NotificationPlugin,
  DialogPlugin
} from 'tdesign-vue';
import 'tdesign-vue/es/style/index.css';
Vue.use(TDesign);

Vue.prototype.$message = MessagePlugin
Vue.prototype.$notification = NotificationPlugin
Vue.prototype.$dialog = DialogPlugin

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
