import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueFilterDateFormat from 'vue-filter-date-format';
import jsPDF from 'jspdf'

import routes from './routes';


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueFilterDateFormat);import VueMoment from 'vue-moment';
Vue.use(VueMoment);

const moment = require('moment')
require('moment/locale/es')

const router = new VueRouter({routes});

new Vue({
  vuetify,
  router,
  jsPDF,
  moment,
  VueAxios,
  VueFilterDateFormat,
  render: h => h(App),
  icons: {
    iconfont: 'mdi',
  },
}).$mount('#app')
