<template>
  <div>
    <h1>Review posts</h1>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'

// import * as ig from 'instagram-scraping'

export default {
  data () {
    /* ig.scrapeTag('еда').then(result => {
      console.dir(result)
    }) */

    return {}
  },
  computed: {
    ...mapState({}),
    ...mapGetters({
    }),
    topic () {
      return {}
    }
  },
  watch: {},
  mounted () {},
  methods: {
    ...mapActions({}),
    ...mapMutations({})
  }
}
</script>
