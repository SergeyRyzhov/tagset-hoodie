<template>
  <div class="generator">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
//import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Generator",
  props: {
    msg: String
  }
};
</script>

<style scoped>

</style>
