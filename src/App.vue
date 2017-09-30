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
@import "scss/colors";
@import "scss/framework-overrides";
$toolbar-datepicker-height: 36px;

body {
  width: 100vw;
}

.app {
  display: flex;

  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  &__body {
    min-height: calc(100vh - 64px - 106px);

    background-color: $color-sandslash;
    color: $color-storm-cloud;

    @media screen and (min-width: 401px) {
      padding: 24px;
    }
  }

  &__footer {
    display: flex;

    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 106px;
    min-height: 106px;

    background-color: $color-iron-sea;
  }

  &__wrapper {
    z-index: 0;
  }

  .input-group__hint { // Vuetify style override
    color: $color-bumble-bee !important;
  }
}

.input-group {
  &--limit-height {
    margin: 18px 0 20px;
    max-height: 48px;
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
  background-color: $color-warlock !important;
  border-radius: 2px;
  color: $color-finn-white !important;

  &--light {
    background-color: $color-nww-green !important;
    color: $color-finn-white !important;
  }
}

.nww-table { // This is not great BEM but it's necessary for overriding the framework
  background: $color-finn-white;

  &__header {
    background-color: $color-bone;
  }

  &__primary-link {
    color: $color-warlock;
    text-decoration: none;
  }

  table.table tbody tr:hover {
    background-color: rgba(77, 134, 160, 0.1);
  }

  &--left-align {
    .datatable__actions {
      justify-content: flex-start;
      padding-left: 20px;
    }
  }
}

.page-content-header {
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  padding: 22px 56px;

  background-color: $color-bone;

  &__text {
    height: 38px;
    margin-bottom: 5px;

    color: $color-iron-sea;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 38px;
    text-align: center;
  }

  &__subtext {
    @extend .page-content-header__text;
    height: 16px;

    color: $color-warlock;
    font-size: 13px;
    line-height: 16px;

    &--dark {
      @extend .page-content-header__subtext;
      color: $color-sad-grey;
    }
  }
}

.page-content-body {
  padding: 33px 50px;

  background-color: $color-finn-white;

  &__column {
    display: flex;

    flex-direction: column;
    width: 300px;

    &--end {
      align-items: flex-end;
    }
  }

  &__form {
    display: flex;

    flex-wrap: wrap;
    justify-content: space-around;
  }

  &__header {
    height: 16px;
    margin-bottom: 20px;

    color: $color-nww-green;
    font-size: 18px;
    font-weight: 500;
    line-height: 16px;

    &--space-above {
      margin-top: 16px;
    }
  }
}

.site-reports-toolbar-datepicker {
  height: $toolbar-datepicker-height;
  margin-left: 10px;
  width: 130px;

  background-color: $color-finn-white;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);

  &__activator {
    display: flex;

    align-items: center;
    height: $toolbar-datepicker-height;
    padding: 11px 10px 11px 15px;

    cursor: pointer;
  }

  &__activator-text {
    height: 20px;
    margin-right: 19px;
    width: 71px;

    color: #9b9b9b;
    font-size: 14px;
    line-height: 20px;
  }
}

.form-input-sub-text {
  height: 13px;
  width: 100%;

  color: $color-bumble-bee;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  text-align: left;
  text-decoration: underline;
}

.table-cell {
  &--truncate {
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
