<template>
  <div>
    <!--tags-->
    <h1>Tags</h1>
    <b-link :to="{ name: 'tag-create', params: { }}">Add new</b-link>
    Hide good: <input type="checkbox" v-model="hideGood"/>
    <ul style="list-style-type: none;">
      <li v-for="tag in tags" :key="'tag' + tag._id">
        <div v-if="!(hideGood && tag.rate > 0)">
          {{ tag.title }} ({{ tag.rate }})
          <b-link :to="{ name: 'tag-view', params: { id: tag._id, tag }}">View</b-link>
          <b-link :to="{ name: 'tag-edit', params: { id: tag._id, tag }}">Edit</b-link>
          <b-button variant="success" size="sm" @click="refreshStatistic(tag)">Update rate</b-button>
        </div>
      </li>
    </ul>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import statisticApi from '../../api/statistic.api.js'

  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'

export default {
    data () {
      return {
        hideGood: false
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tags.all,
        topics: state => state.topics.all,
        links: state => state.links.all
      })
    },
    methods: {
      ...mapActions({
        saveToDb: 'tags/addOrUpdate'
      }),
      ...mapMutations({}),
      refreshStatistic (tag) {
        statisticApi.getStatistics(tag.title).then(statistic => {
          this.$set(tag, 'rate', statistic.posts)
          this.saveToDb(tag)
        })
      }}
  }
</script>

<style scoped>
</style>
