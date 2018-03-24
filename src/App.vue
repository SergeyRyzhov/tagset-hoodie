<template>
  <div id="app">
    <p>
    <router-link to="/">Tag set</router-link>
    <router-link to="/themes">Themes</router-link>
    <router-link to="/tags">Tags</router-link>
  </p>
  <router-view></router-view>
  </div>
</template>

<script>
import router from "./router";

export default {
  name: "app",
  components: {},
  router
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
