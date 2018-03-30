<template>
  <div>
    <h1>Edit topic and tags</h1>
    <div>
      Remove topic:
      <b-button variant="danger" size="sm" @click="remove(topic)">{{ topic.title }}</b-button>
    </div>
    <div>
      Remove tag from topic:
      <div v-for="tag in tags(topic)" :key="'tag' + tag._id" style="display: inline;">
        <b-button variant="danger" size="sm" @click="removeLink({topic, tag})">{{tag.title}}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from "vuex";

  export default {
    data() {
      return {};
    },
    mounted() {},
    watch: {
      topic(x) {
        if (!x) this.$router.push({
          path: "/topics"
        });
      }
    },
    computed: {
      ...mapState({}),
      ...mapGetters({
        tags: "topics/tags"
      }),
      topic() {
        var topic = this.$route.params.topic || {
          _id: this.$route.params.id
        };
        return this.$store.getters["topics/findWhere"](topic);
      }
    },
    methods: {
      ...mapActions({
        remove: "topics/remove",
        removeLink: "links/remove"
      }),
      ...mapMutations({})
    }
  };
</script>