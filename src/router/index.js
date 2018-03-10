import Vue from 'vue'
import Router from 'vue-router'

import CollectionSites from '../components/admin/CollectionSites'
// import CollectionSites from '@/components/admin/CollectionSites'
import CollectionSiteData from '../components/admin/CollectionSiteData'
import LogData from '../components/admin/LogData'
import About from '../components/main/About'
import DataPage from '../components/main/DataPage'
import SignIn from '../components/main/SignIn'
// import firebase from 'firebase'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/DataPage'
    },
    {
      path: '/',
      redirect: '/DataPage'
    },
    {
      path: '/DataPage',
      name: 'DataPage',
      component: DataPage
    },
    {
      path: '/signIn',
      component: SignIn
    },
    {
      path: '/about',
      name: 'About',
      component: About
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
    },
    {
      path: '/logData/:id',
      name: 'Log Data Id',
      component: LogData,
      meta: { requiresAuth: true }
    }
  ]
})
