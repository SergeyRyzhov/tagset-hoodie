<template>
  <div class="tags">
    <h1>{{ msg }}</h1>
    <ul v-for="tag in tags" v-bind:key="tag">
      <li>{{tag}}</li>
      </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Tags",
  props: {
    msg: String
  },
  computed: mapGetters({
    tags: "allTags"
  }),
  methods: mapActions([]),
  created() {
    this.$store.dispatch("getAllTags");
  }
};
</script>

<style scoped>

</style>
