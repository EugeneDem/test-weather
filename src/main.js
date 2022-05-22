import Vue from 'vue'
import Vuelidate from 'vuelidate'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
Object.defineProperty( Vue.prototype, '$moment', { value: moment })

Vue.use(Vuelidate)

import Request from '@/utils/Request.js';
Vue.prototype.$Request = Request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
