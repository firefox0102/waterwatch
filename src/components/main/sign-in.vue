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
      <form
        v-on:submit="submitForm"
        class="sign-in-body__form">
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
        <v-btn
          type="submit"
          v-on:click.native="signInWithPassword()"
          class="md-raised btn-nww sign-in-body__btn">
          Sign In
        </v-btn>
      </form>
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

function signInTest (to, from, next) {
  if (firebase.auth().currentUser) {
    next({
      path: '/logData',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
}

export default {
  name: 'sign-in',
  beforeEnter: signInTest,
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
    submitForm (evnt) {
      this.signInWithPassword()
      evnt.preventDefault()
    },
    signInWithPassword () {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
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
  height: 100px;
  min-width: 30px;
  padding: 28px 30px;
  width: 100%;

  background-color: #004d71;

  @media screen and (min-width: $small-screen-breakpoint) {
    max-width: 360px;
    width: 360px;
  }

  &__text {
    height: 16px;
    color: #e5e5e5;
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
  min-width: 30px;
  padding: 65px 30px 46px;
  width: 100%;

  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(155, 155, 155, 0.5);

  @media screen and (min-width: $small-screen-breakpoint) {
    height: 420px;
    max-height: 420px;
    max-width: 360px;
    width: 360px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__sub-text {
    height: 13px;
    width: 96px;

    color: #8e7630;
    cursor: pointer;
    font-family: Roboto;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    text-decoration: underline;
  }

  &__btn {
    align-self: center;
    height: 36px;
    margin-top: 44px;
    width: 88px;
  }
}
</style>
