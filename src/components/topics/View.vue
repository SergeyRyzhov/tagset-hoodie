<template>
  <div>
    <h1>Preview topic</h1>

    <div v-if="topic">
      <h2>{{ topic.title }}</h2>
      <div
        v-for="tag in tags(topic)"
        :key="'tag' + tag._id"
        style="display: inline;"
      >
        #{{ tag.title }} ({{ tag.rate }})
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
} from 'vuex'

export default {
  data () {
    return {}
  },
  watch: {},
  mounted () {},
  computed: {
    ...mapState({}),
    ...mapGetters({
      tags: 'topics/tags'
    }),
    topic () {
      var topic = this.$route.params.topic || {
        _id: this.$route.params.id
      }
      return this.$store.getters['topics/findWhere'](topic)
    }
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({})
  }
}
</script>
