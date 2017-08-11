<template>
  <div class="sign-in">
    <div class="sign-in-header">
      <span class="sign-in-header__text">
        ADMIN
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
            v-model="formUser.email">
          </v-text-field>

        <v-text-field
            label="Password"
            :type="passVisible ? 'text' : 'password'"
            :append-icon="passVisible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passVisible = !passVisible)"
            v-model="formUser.password">
          </v-text-field>

        <v-dialog v-model="showResetPassword" persistent>
          <a class="form-input-sub-text--hug-input" slot="activator">Forget Password?</a>
          <v-card>
            <v-card-title class="headline">Reset Password</v-card-title>
            <v-card-text>
                <v-text-field
                  v-model="formUser.email"
                  label="Email Address"
                  single-line>
                </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="showResetPassword = false">Cancel</v-btn>
              <v-btn class="green--text darken-1" flat="flat" @click.native="resetPassword">Send Reset Email</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          type="submit"
          v-on:click.native="signInWithPassword()"
          class="md-raised btn-nww sign-in-body__btn">
          Sign In
        </v-btn>
      </form>
    </div>
    <v-snackbar
      :timeout="errorSnackbar.timeout"
      :error="true"
      v-model="errorSnackbar.visible">
      {{errorSnackbar.errorMessage}}
      <v-btn dark flat @click.native="errorSnackbar.visible = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      :timeout="passwordSnackbar.timeout"
      :info="true"
      v-model="passwordSnackbar.visible">
      {{passwordSnackbar.errorMessage}}
      <v-btn dark flat @click.native="passwordSnackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'sign-in',
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user: function () {
      if (firebase.auth().currentUser) {
        this.$router.push('/logData')
      }
    }
  },
  data () {
    return {
      showResetPassword: false,
      passVisible: false,
      formUser: {
        email: '',
        password: ''
      },
      errorSnackbar: {
        visible: false,
        errorMessage: 'There was an issue signing in to Admin',
        timeout: 6000
      },
      passwordSnackbar: {
        visible: false,
        errorMessage: 'Password email reset sent!',
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
      firebase.auth().signInWithEmailAndPassword(this.formUser.email, this.formUser.password)
      .then((userData) => {
        this.onSignedIn()
      })
      .catch(() => {
        this.errorSnackbar.visible = true
      })
    },
    onSignedIn () {
      this.$router.push('/logData')
    },
    resetPassword () {
      console.log('test')
      console.log(this.formUser.email)
      firebase.auth().sendPasswordResetEmail(this.formUser.email).then(() => {
        this.showResetPassword = false
        this.passwordSnackbar.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";
$small-screen-breakpoint: 401px;

.reset-password-input {
  width: 100%;

}

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

  background-color: $color-iron-sea;

  @media screen and (min-width: $small-screen-breakpoint) {
    max-width: 360px;
    width: 360px;
  }

  &__text {
    height: 16px;
    color: $color-finn-white;
    font-size: 13px;
    font-weight: 500;
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

  background-color: $color-finn-white;
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

  &__btn {
    align-self: center;
    height: 36px;
    margin-top: 44px;
    width: 88px;
  }
}
</style>
