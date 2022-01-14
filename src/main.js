import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import StorageConfig from '@/config/storage'
import axiosInstance from '@/utils/request'

import TDesign from 'tdesign-vue'
import VueStorage from 'vue-ls'
import {
  MessagePlugin,
  NotificationPlugin,
  DialogPlugin
} from 'tdesign-vue';
import 'tdesign-vue/es/style/index.css';

Vue.config.productionTip = false

Vue.use(TDesign);
Vue.use(VueStorage, StorageConfig)

Vue.prototype.$message = MessagePlugin
Vue.prototype.$notification = NotificationPlugin
Vue.prototype.$dialog = DialogPlugin
Vue.prototype.$request = axiosInstance

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
