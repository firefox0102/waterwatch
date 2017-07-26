<template>
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
      <form class="sign-in-body__form">
        <v-text-field
            label="Email"
            class="input-group--focused"
            v-model="user.email">
          </v-text-field>

        <v-text-field
            label="Password"
            :type="passVisible ? 'text' : 'password'"
            :append-icon="passVisible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passVisible = !passVisible)"
            v-model="user.password"
            class="input-group--focused">
          </v-text-field>

        <a class="sign-in-body__sub-text">Forget Password?</a>
      </form>
      <v-btn
        v-on:click.native="signInWithPassword()"
        class="md-raised btn-nww sign-in-body__btn">
        Sign In
      </v-btn>
    </div>
    <v-snackbar
      :timeout="snackbar.timeout"
      :error="true"
      v-model="snackbar.visible">
      {{snackbar.errorMessage}}
      <v-btn dark flat @click.native="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase'

function testAuth (to, from, next) {
  console.log('test')
  if (firebase.auth().currentUser) {
    console.log('User is logged in')
    next({
      path: '/logData',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    console.log('User is not logged in:')
    next()
  }
}

export default {
  name: 'sign-in',
  beforeEnter: testAuth,
  data () {
    return {
      passVisible: false,
      user: {
        email: '',
        password: ''
      },
      snackbar: {
        visible: false,
        errorMessage: 'There was an issue signing in to Admin',
        timeout: 6000
      }
    }
  },
  methods: {
    signInWithPassword () {
      console.log(this.user.email)
      console.log(this.user.password)
      return firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((userData) => {
        this.onSignedIn()
        return userData
      })
      .catch(() => { this.snackbar.visible = true })
    },
    onSignedIn () {
      this.$router.go('/')
    }
  }
}
</script>

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
    background-color: #004D71;

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
    padding: 65px 30px 46px;
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
      color: #8E7630;
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
