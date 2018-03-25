<template>
  <div class="themes">
    <h1>themes</h1>
    <ul v-for="theme in themes" v-bind:key="theme._id">
      <li>{{theme.title}}</li>
      </ul>
      <input v-model="title" />
      <button @click="add">add theme</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Themes",
  props: {
    msg: String
  },
  data() {
    return {
      title: ""
    };
  },
  computed: mapGetters({
    themes: "themes/all"
  }),
  methods: {
    ...mapActions([]),
    add() {
      this.$store.dispatch("themes/add", { title: this.title }).then(()=>this.$store.sync())
    }
  },
  created() {
    this.$store.dispatch("themes/init");
  }
};
</script>

<style scoped>

</style>
