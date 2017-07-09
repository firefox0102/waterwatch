// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import 'vue-material/dist/vue-material.css'
import App from './App'

import CollectionSites from './components/admin/collection-sites'
import LogData from './components/admin/log-data'
import ManageUsers from './components/admin/manage-users'
import Reports from './components/admin/reports'

import About from './components/main/about'
import DataPage from './components/main/data-page'
import SignIn from './components/main/sign-in'

Vue.use(VueMaterial)
Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.material.registerTheme('default', {
  primary: 'grey',
  warn: 'red',
  background: 'white'
});

const routes = [
  { path: '/collectionSites', component: CollectionSites },
  { path: '/logData', component: LogData },
  { path: '/manageUsers', component: ManageUsers },
  { path: '/reports', component: Reports },
  { path: '/about', component: About },
  { path: '/dataPage', component: DataPage },
  { path: '/signIn', component: SignIn },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});
