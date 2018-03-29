<template>
  <div>
    <h1>Preview tag</h1>

    <h2>{{ tag.title }}</h2>
    <div v-for="topic in topics(tag)" :key="'topic' + topic._id" style="display: inline;">
        #{{ topic.title }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState({}),
    ...mapGetters({
      topics: "tags/topics",
    }),
    tag() {
      var tag = this.$route.params.tag || { _id: this.$route.params.id };
      return this.$store.getters["tags/findWhere"](tag);
    }
  },
  methods: {
    ...mapActions({
      remove: "tags/remove",
      removeLink: "links/remove"
    }),
    ...mapMutations({})
  }
};
</script>


