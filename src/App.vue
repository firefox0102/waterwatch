<template>
  <div id="app" class="app">
    <app-nav v-bind:user="user"></app-nav>
    <div class="app__wrapper">
      <div class="app__body">
        <router-view></router-view>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppNav from './components/app-nav'
  import AppFooter from './components/app-footer'

  export default {
    name: 'app',
    data: function() {
      return {
        msg: "App loaded",
        user: {
          name: Peter
        }
      }
    },
    components: {
      'app-nav': AppNav,
      'app-footer': AppFooter
    }
  }
</script>

<style lang="scss">
  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;

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
      background-color: #4A4A4A;
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

  .btn-dark {
    border-radius: 2px;
    color: white !important;
    background-color: #4A4A4A !important;
  }
</style>
