<template>
  <header>
    <div class="md-transparent app-nav">
      <div class="app-nav__primary-section">
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
          <v-btn flat class="app-nav__button" v-on:click.native="logout()">
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
        arrNav: [
          {
            title: 'Log Data',
            id: '1',
            auth: true,
            path: '/logData'
          },
          {
            title: 'Collection Sites',
            id: '2',
            auth: true,
            path: '/collectionSites'
          },
          {
            title: 'Reports',
            id: '3',
            auth: true,
            path: '/reports'
          },
          {
            title: 'Manage Users',
            id: '4',
            auth: true,
            path: '/manageUsers'
          },
          {
            title: 'Data',
            id: '5',
            auth: false,
            path: '/dataPage'
          },
          {
            title: 'About',
            id: '6',
            auth: false,
            path: '/about'
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
$navbar-height: 64px;
$nav-split-breakpoint: 820px;

.app-nav {
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: calc($navbar-height * 2);
  min-height: $navbar-height;
  padding: 0;

  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(155, 155, 155, 0.5);

  @media screen and (min-width: $nav-split-breakpoint) {
    flex-direction: row;
    height: $navbar-height;
    padding: 0 66px;
  }

  &__link {
    text-decoration: none;
  }

  &__button {
    height: $navbar-height;
    margin: 0;

    color: #004d71;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none !important;

    &:hover {
      border-bottom: 2px solid #7fba00;
      color: #7fba00;
    }

    &--small {
      height: $navbar-height;
      margin: 0;

      color: #004d71;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      text-decoration: none !important;

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
    display: flex;

    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    @media screen and (min-width: $nav-split-breakpoint) {
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
