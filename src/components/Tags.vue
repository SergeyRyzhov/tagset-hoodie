<template>
  <div class="tags">
    <h1>tags</h1>
    <ul v-for="tag in tags" v-bind:key="tag._id">
      <li>{{tag.title}}</li>
      </ul>
      <input v-model="title" />
      <button @click="add">add tag</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Tags",
  props: {
    msg: String
  },
  data() {
    return {
      title: ""
    };
  },
  computed: mapGetters({
    tags: "tags/all"
  }),
  methods: {
    ...mapActions([]),
    add() {
      this.$store.dispatch("tags/add", { title: this.title }).then(()=>this.$store.sync())
    }
  },
  created() {
    this.$store.dispatch("tags/init");
  }
};
</script>

<style scoped>

</style>
