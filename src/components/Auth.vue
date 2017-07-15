<template lang="html">
  <div class="sign-in">
    <div class="sign-in-header">
      <span class="sign-in-header__text">
        Site Admin
      </span>
      <span class="sign-in-header__text--large">
        Sign In
      </span>
    </div>
    <div class="sign-in-body">
      <!-- <form class="sign-in-body__form"> -->
        <div id="firebaseui-auth-container"></div>
      <!-- </form> -->
      <!-- <v-btn class="md-raised btn-dark sign-in-body__btn">
        Sign In
      </v-btn> -->
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import firebaseui from 'firebaseui'

  export default {
    name: 'auth',
    mounted () {
      var uiConfig = {
        signInSuccessUrl: '/logData',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      }

      // let ui
      // if (!firebase.apps.length) {
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
      // } else {
        // console.log(firebase.apps)

        // ui = firebase.apps[0]
      // }

      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $small-screen-breakpoint: 401px;

  .sign-in {
    display: flex;
    align-items: center;
    flex-direction: column;

    @media screen and (min-width: $small-screen-breakpoint) {
      padding-top: 73px;
    }
  }

  .sign-in-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 30px;
    height: 100px;
    padding: 28px 30px;
    background-color: #4A4A4A;

    @media screen and (min-width: $small-screen-breakpoint) {
      width: 360px;
      max-width: 360px;
    }

    &__text {
      height: 16px;
      color: #E5E5E5;
      font-family: Roboto;
      font-size: 13px;
      line-height: 16px;

      &--large {
        @extend .sign-in-header__text;
        font-size: 28px;
        line-height: 28px;
      }
    }
  }

  .sign-in-body {
    display: flex;
    flex-direction: column;
    height: 455px;
    width: 100%;
    min-width: 30px;
    padding: 44px 30px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px 0 rgba(155,155,155,0.5);

    @media screen and (min-width: $small-screen-breakpoint) {
      width: 360px;
      max-width: 360px;
      height: 420px;
      max-height: 420px;
    }

    &__form {
      display: flex;
      flex-direction: column;
    }

    &__sub-text {
      height: 13px;
      width: 96px;
      color: #9B9B9B;
      font-family: Roboto;
      font-size: 11px;
      line-height: 13px;
      cursor: pointer;
      text-align: center;
      text-decoration: underline;
    }

    &__btn {
      align-self: center;
      height: 36px;
      width: 88px;
      margin-top: 44px;
    }
  }
</style>
