import Vue from 'vue'
import Router from 'vue-router'

import CollectionSites from '../components/admin/collection-sites'
import CollectionSiteData from '../components/admin/collection-site-data'
import LogData from '../components/admin/log-data'
import About from '../components/main/about'
import DataPage from '../components/main/data-page'
import SignIn from '../components/main/sign-in'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: SignIn,
      meta: { requiresAuth: false }
    },
    {
      path: '/signIn',
      component: SignIn,
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { requiresAuth: false }
    },
    {
      path: '/dataPage',
      component: DataPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/collectionSiteData/:siteId',
      name: 'Collection Site Data',
      component: CollectionSiteData,
      meta: { requiresAuth: true }
    },
    {
      path: '/logData',
      name: 'Log Data',
      component: LogData,
      meta: { requiresAuth: true }
    },
    {
      path: '/collectionSites',
      name: 'Collection Sites',
      component: CollectionSites,
      meta: { requiresAuth: true }
    }
  ]
})
