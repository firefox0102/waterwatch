import Vue from 'vue'
import Router from 'vue-router'

import CollectionSites from '../components/admin/collection-sites'
import CollectionSiteData from '../components/admin/collection-site-data'
import LogData from '../components/admin/log-data'
import ManageUsers from '../components/admin/manage-users'
import Reports from '../components/admin/reports'
import About from '../components/main/about'
import DataPage from '../components/main/data-page'

import SignIn from '../components/main/sign-in'
// import Auth from '../components/Auth.vue'
// import AuthSuccess from '../components/AuthSuccess.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: SignIn
    },
    {
      path: '/signIn',
      component: SignIn
    },
    {
      path: '/collectionSites',
      name: 'Collection Sites',
      component: CollectionSites
    },
    {
      path: '/collectionSiteData/:siteId',
      name: 'Collection Site Data',
      component: CollectionSiteData
    },
    {
      path: '/logData',
      name: 'Log Data',
      component: LogData
    },
    {
      path: '/manageUsers',
      name: 'Manage Users',
      component: ManageUsers
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/dataPage',
      component: DataPage
    }
  ]
})
