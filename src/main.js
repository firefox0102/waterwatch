// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import VueHighcharts from 'vue2-highcharts'
import store from './helpers/store'
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
import JsonExcel from 'vue-json-excel'
import VueAnalytics from 'vue-analytics'

Vue.component('downloadExcel', JsonExcel)
// import Sheets from 'helpers/sheetsJS'

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(VueHighcharts)
Vue.use(VueLodash, lodash)
Vue.config.productionTip = false
Vue.use(VueAnalytics, {
  id: 'UA-3008698-3'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
