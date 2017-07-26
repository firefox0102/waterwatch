<template>
  <div>
    Manage users section
  </div>
</template>

<script>
import firebase from 'firebase'

function requireAuth (to, from, next) {
  if (!firebase.auth().currentUser) {
    console.log('User is not logged in')
    next({
      path: '/signIn',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    console.log('User is logged in:', firebase.auth().currentUser.uid)
    next()
  }
}

export default {
  name: 'manage-users',
  beforeEnter: requireAuth
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
