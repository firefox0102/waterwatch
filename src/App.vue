<template>
  <div id="app" class="app">
    <app-nav></app-nav>
    <div class="app__wrapper">
      <div class="app__body">
        <router-view></router-view>
      </div>
    </div>
    <footer class="app__footer">

    </footer>
  </div>
</template>

<script>
  import AppNav from './components/app-nav'

  export default {
    name: 'app',
    data: function() {
      return {
        msg: "App loaded"
      }
    },
    components: {
      'app-nav': AppNav
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
      padding: 36px 48px;
      min-height: calc(100vh - 64px - 140px);
    }

    &__footer {
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
</style>
