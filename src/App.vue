<template>
  <div id="app">
    <Navigator />
    <router-view />
  </div>
</template>

<script>
import Navigator from './components/Navigator.vue'
import router from './router'
import firebase from 'firebase'

router.beforeEach((to, from, next) => {
  if (!to) {
    next()
    return
  }

  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/sign-in')
  } else {
    next()
  }
})

export default {
  name: 'App',
  components: {
    Navigator
  },
  router
}
</script>

<style scoped>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
