<template>
  <header>
    <md-toolbar class="md-transparent app-nav__toolbar app-nav">
      <div class="app-nav__section flex-start">
        <img class="app-nav__crk-logo" src="../assets/client-logo-crk.png"/>
        <img class="app-nav__nww-logo" src="../assets/nww-logo.png"/>
      </div>
      <div class="app-nav__section flex-end">
        <router-link to="/logData">
          <md-button class="app-nav__button">
            Log Data
          </md-button>
        </router-link>

        <router-link to="/collectionSites">
          <md-button class="app-nav__button">
            Collection Sites
          </md-button>
        </router-link>

        <router-link to="/reports">
          <md-button class="app-nav__button">
            Reports
          </md-button>
        </router-link>

        <router-link to="/manageUsers">
          <md-button class="app-nav__button">
            Manage Users
          </md-button>
        </router-link>

        <router-link to="/signOut">
          <md-button class="app-nav__button">
            Sign Out
          </md-button>
        </router-link>
      </div>
    </md-toolbar>
  </header>
</template>

<script>
export default {
  name: 'app-nav'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $navbar-height: 64px;

  .app-nav {
    display: flex;

    align-items: center;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 3px 0 rgba(155,155,155,0.5);

    height: $navbar-height;
    min-height: $navbar-height;
    padding: 0 66px;

    &__crk-logo {
      height: $navbar-height;
    }

    &__nww-logo {
      height: 40px;
    }

    &__button {
    	height: $navbar-height;
    	color: #9B9B9B;
    	font-size: 14px;
    	font-weight: 500;
    	text-align: center;
      margin: 0;

      &:hover {
    	   color: #4A4A4A;
         border-bottom: 2px solid #4A4A4A;
      }
    }

    .router-link-active {
      .app-nav__button {
        @extend .app-nav__button:hover;
      }
    }

    &__section {
      width: 50%;
    }
  }
</style>
