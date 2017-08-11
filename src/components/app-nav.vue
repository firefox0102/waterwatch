<template>
  <header>
    <v-navigation-drawer
      class="pb-0 app-sidebar"
      floating
      absolute
      height="calc(100vh - 64px)"
      clipped
      enable-resize-watcher
      v-model="controls.sidebarOpen">
      <router-link
        class="app-sidebar__link"
        v-for="(item, index) in arrNav"
        v-if="item.auth === !!user"
        v-bind:to="item.path"
        v-bind:key="index">
        <i class="material-icons app-sidebar__icon">{{item.icon}}</i>
        {{ item.title }}
      </router-link>
      <a
        v-if="user"
        class="app-sidebar__link"
        v-on:click="logout()">
        <i class="material-icons app-sidebar__icon">lock</i>
        Sign Out
      </a>
      <router-link
        v-else
        class="app-sidebar__link"
        to="/signIn">
        <i class="material-icons app-sidebar__icon">lock</i>
        Admin
      </router-link>
    </v-navigation-drawer>
    <div class="app-nav">
      <div class="app-nav__primary-section">
        <v-toolbar-title class="app-sidebar-toggle">
          <v-toolbar-side-icon @click.native.stop="controls.sidebarOpen = !controls.sidebarOpen"></v-toolbar-side-icon>
        </v-toolbar-title>
        <img class="app-nav__crk-logo" src="../assets/client-logo-crk.png"/>
        <img class="app-nav__nww-logo" src="../assets/nww-logo.png"/>
      </div>
      <div class="app-nav__secondary-section">
        <router-link
          v-for="(item, index) in arrNav"
          class="app-nav__link"
          v-bind:to="item.path"
          v-bind:key="index">
          <v-btn class="app-nav__button" v-if="item.auth === !!user" flat>
            {{ item.title }}
          </v-btn>
        </router-link>

        <a v-if="user" class="app-nav__link">
          <v-btn flat class="app-nav__button--small" v-on:click.native="logout()">
            <i class="material-icons">lock</i>
            Sign Out
          </v-btn>
        </a>
        <router-link v-else  class="app-nav__link" to="/signIn">
          <v-btn flat class="app-nav__button--small">
            <i class="material-icons">lock</i>
            Admin
          </v-btn>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'

  export default {
    name: 'app-nav',
    computed: {
      ...mapState(['user'])
    },
    data () {
      return {
        controls: {
          sidebarOpen: false
        },
        arrNav: [
          {
            title: 'Log Data',
            id: '1',
            auth: true,
            path: '/logData',
            icon: 'format_align_left'
          },
          {
            title: 'Collection Sites',
            id: '2',
            auth: true,
            path: '/collectionSites',
            icon: 'location_on'
          },
          {
            title: 'Data',
            id: '3',
            auth: false,
            path: '/dataPage',
            icon: 'data_usage'
          },
          {
            title: 'About',
            id: '4',
            auth: false,
            path: '/about',
            icon: 'info_about'
          }
        ]
      }
    },
    methods: {
      logout () {
        console.log('login outtt')
        firebase.auth().signOut().then(function () {
          window.location.href = '/signIn'
        }, function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../scss/colors";

$navbar-height: 64px;
$nav-split-breakpoint: 820px;

.app-sidebar {
  display: flex;
  z-index: 5;

  flex-direction: column;
  margin-top: $navbar-height;

  @media screen and (min-width: $nav-split-breakpoint) {
    display: none;
  }

  &__link {
    display: flex;

    margin: 12px 0 12px 16px;
    width: 100%;

    color: $color-iron-sea;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-decoration: none;

    &:nth-of-type(1) {
      margin-top: 24px;
    }

    &.router-link-active,
    &.router-link-active i {
      color: $color-nww-green;
    }
  }

  &__icon {
    margin-right: 20px;
    width: 24px;

    color: $color-iron-sea;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
  }
}

.app-sidebar-toggle {
  display: block;

  @media screen and (min-width: $nav-split-breakpoint) {
    display: none;
  }
}

.app-nav {
  display: flex;
  position: relative;
  z-index: 6;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: $navbar-height;
  max-height: $navbar-height;
  min-height: $navbar-height;
  padding: 0;

  background-color: $color-finn-white;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(155, 155, 155, 0.5);

  @media screen and (min-width: $nav-split-breakpoint) {
    padding: 0 40px;
  }

  &__link {
    text-decoration: none;
  }

  &__button {
    height: $navbar-height;
    margin: 0;

    color: $color-iron-sea;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none !important;

    &:hover {
      border-bottom: 2px solid $color-nww-green;
      color: $color-nww-green;
    }

    &--small {
      @extend .app-nav__button;
      height: $navbar-height;
      margin: 0;

      color: $color-iron-sea;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      // text-decoration: none !important;

      .material-icons {
        font-size: 12px;
      }
    }
  }

  &__crk-logo {
    display: none;

    @media screen and (min-width: 1000px) {
      display: block;
      height: $navbar-height;
    }
  }

  &__nww-logo {
    height: 40px;
  }

  &__primary-section {
    display: flex;

    align-items: center;
    padding: 12px 20px;
    width: 100%;

    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(155, 155, 155, 0.5);

    @media screen and (min-width: $nav-split-breakpoint) {
      width: 30%;
      box-shadow: none;
    }
  }

  &__secondary-section {
    display: none;

    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    @media screen and (min-width: $nav-split-breakpoint) {
      display: flex;

      flex-wrap: nowrap;
      justify-content: flex-end;
      width: 70%;
    }
  }

  .router-link-active {
    .app-nav__button {
      @extend .app-nav__button:hover;
    }
  }

  .toolbar__content {
    width: 100%;
  }
}
</style>
