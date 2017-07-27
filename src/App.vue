<template>
  <v-app>
    <div id="app" class="app">
      <app-nav></app-nav>
      <div class="app__wrapper">
        <div class="app__body">
          <router-view ></router-view>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  </v-app>
</template>

<script>
import AppNav from './components/app-nav'
import AppFooter from './components/app-footer'
import firebase from 'firebase'
import { mapState } from 'vuex'
import router from './router'

export default {
  name: 'app',
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth state changed')
      this.$store.commit('setUser', user || false)

      if (user) {
        console.log('auth user is good')
        this.$router.push('/logData')
      } else {
        console.log('auth user is logged out')

        this.$router.push('/signIn')
      }
    })

    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!firebase.auth().currentUser) {
          next({
            path: '/signIn',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // make sure to always call next()!
      }
    })
  },
  components: {
    'app-nav': AppNav,
    'app-footer': AppFooter
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>

<style lang="scss">
$toolbar-datepicker-height: 36px;

body {
  width: 100vw;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;

  &__body {
    background-color: #F3F3F3;
    min-height: calc(100vh - 64px - 140px);

    @media screen and (min-width: 401px) {
      padding: 36px 48px;
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 140px;
    min-height: 140px;
    background-color: #004D71;
  }

  .input-group__hint { // Vuetify style override
    color: #8E7630 !important;
  }
}

.flex-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.flex-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-nww { // Vuetify style override
  border-radius: 2px;
  color: white !important;
  background-color: #4D86A0 !important;

  &--light {
    color: white !important;
    background-color: #7FBA00 !important;
  }
}

.nww-table {
  background: #FFF;

  table.table tbody tr:hover {
    background: rgba(127,186,0,0.1);
  }
}

.reports-toolbar-datepicker {
  height: $toolbar-datepicker-height;
  width: 130px;
  margin-left: 10px;
  border-radius: 2px;
  background-color: #FFFFFF;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);

  &__activator {
    display: flex;
    align-items: center;
    height: $toolbar-datepicker-height;
    cursor: pointer;
    padding: 11px 10px 11px 15px;
  }

  &__activator-text {
    height: 20px;
    width: 71px;
    color: #9B9B9B;
    font-size: 14px;
    line-height: 20px;
    margin-right: 19px;
  }
}

.page-content-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #F7F7F7;
  padding: 22px 56px;

  &__text {
  	height: 38px;
    color: #004D71;
  	font-family: Roboto;
  	font-size: 32px;
  	font-weight: 300;
  	letter-spacing: 1px;
  	line-height: 38px;
  	text-align: center;
    margin-bottom: 5px;
  }

  &__subtext {
    @extend .page-content-header__text;
    height: 16px;
    color: #4D86A0;
    font-family: Roboto;
    font-size: 13px;
    line-height: 16px;
  }
}

.page-content-body {
  padding: 33px 50px;
  background-color: #FFFFFF;

  &__column {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  &__form {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  &__header {
    height: 16px;
    color: #7FBA00;
    font-size: 18px;
    font-weight: 500;
    line-height: 16px;
    margin-bottom: 46px;
  }
}
</style>
