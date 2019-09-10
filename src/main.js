import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import routes from './routes';


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const router = new VueRouter({routes});

new Vue({
  vuetify,
  router,
  VueAxios,
  render: h => h(App),
  icons: {
    iconfont: 'mdi',
  },
}).$mount('#app')