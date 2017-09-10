import Vue from 'vue'
import Router from 'vue-router'

import CollectionSites from '../components/admin/CollectionSites'
import CollectionSiteData from '../components/admin/CollectionSiteData'
import LogData from '../components/admin/LogData'
import About from '../components/main/About'
import DataPage from '../components/main/DataPage'
import SignIn from '../components/main/SignIn'

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
      path: '/logData/:siteId/:reportId',
      name: 'Edit Log Data',
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
