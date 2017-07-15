<!-- Test page for viewing user information -->
<template>
  <div>
    <h1>Sign Out</h1>
    <button v-on:click='logOut'>Log out</button>
    <hr>
    <img :src='photo'>
    <br>
    <p>{{name}}</p>
    <p>{{email}}</p>
    <p>{{userId}}</p>
    <hr>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  created () {
    this.user = firebase.auth().currentUser

    if (this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.photo = this.user.photoURL
      this.userId = this.user.uid
    }
  },
  methods: {
    logOut () {
      console.log('logging out')
      firebase.auth().signOut()
    }
  }
}
</script>
