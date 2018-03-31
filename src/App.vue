<template>
  <div id="app">
    <Navigator></Navigator>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigator from './components/Navigator.vue'
  import router from './router'

  export default {
    name: 'app',
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
