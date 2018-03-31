<template>
  <div>
    <!--tags-->
    <h1>Tags</h1>
    <ul style="list-style-type: none;">
      <li v-for="tag in tags" :key="'tag' + tag._id">
        {{ tag.title }}
        <b-link :to="{ name: 'tag-view', params: { id: tag._id, tag }}">View</b-link>
        <b-link :to="{ name: 'tag-edit', params: { id: tag._id, tag }}">Edit</b-link>
      </li>
    </ul>
    <b-link :to="{ name: 'tag-create', params: { }}">Add new</b-link>

    <router-view></router-view>
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
        tags: state => state.tags.all,
        topics: state => state.topics.all,
        links: state => state.links.all
      })
    },
    methods: {}
  }
</script>

<style scoped>
</style>
