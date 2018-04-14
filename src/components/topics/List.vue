<template>
  <div>
    <!--topics-->
    <h1>Topics</h1>
    <b-button size="sm" :to="{ name: 'topic-create', params: { }}">Add new</b-button>
    <ul style="list-style-type: none;">
      <li v-for="topic in topics" :key="'topic' + topic._id">
        {{ topic.title }}
        <b-button size="sm" :to="{ name: 'topic-view', params: { id: topic._id, topic }}">View</b-button>
        <b-button size="sm" :to="{ name: 'topic-edit', params: { id: topic._id, topic }}">Edit</b-button>
      </li>
    </ul>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

export default {
    data () {
      return {}
    },
    computed: {
      ...mapState({
        topics: state => state.topics.all,
        tags: state => state.tags.all,
        links: state => state.links.all
      })
    },
    methods: {}
  }
</script>

<style scoped>
</style>
