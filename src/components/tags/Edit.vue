<template>
  <div>
    <h1>Edit tag and topics</h1>
    <div>
      Remove tag:
      <b-button variant="danger" size="sm" @click="remove(tag)">{{ tag.title }}</b-button>
    </div>
    <div>
      Remove tag from topics:
      <div v-for="topic in topics(tag)" :key="'topic' + topic._id" style="display: inline;">
        <b-button variant="danger" size="sm" @click="removeLink({topic, tag})">{{topic.title}}</b-button>
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
    mounted () {},
    computed: {
      ...mapState({}),
      ...mapGetters({
        topics: 'tags/topics'
      }),
      tag () {
        var tag = this.$route.params.tag || {
          _id: this.$route.params.id
        }
        return this.$store.getters['tags/findWhere'](tag)
      }
    },
    watch: {
      tag (x) {
        if (!x) {
          this.$router.push({
            path: '/tags'
          })
        }
      }
    },
    methods: {
      ...mapActions({
        remove: 'tags/remove',
        removeLink: 'links/remove'
      }),
      ...mapMutations({})
    }
  }
</script>