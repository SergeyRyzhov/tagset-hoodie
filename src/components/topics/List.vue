<template>
  <div>
    <!--topics-->
    <h1>Topics</h1> 
    <ul style="list-style-type: none;">
      <li v-for="topic in topics" :key="'topic' + topic._id">
        {{ topic.title }}
        <b-link :to="{ name: 'topic-view', params: { id: topic._id, topic }}">View</b-link>
        <b-link :to="{ name: 'topic-edit', params: { id: topic._id, topic }}">Edit</b-link>
      </li>
    </ul>
    <b-link :to="{ name: 'topic-create', params: { }}">Add new</b-link>
    
    <router-view></router-view>   
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      topics: state => state.topics.all,
      tags: state => state.tags.all,
      links: state => state.links.all
    })
  },
  methods: {
    _tagsOfTopic(topic) {
      return this.links.filter(link => link.topic == topic._id).reduce(
        ((tags, link) => {
          tags.push(this.tags.find(tag => tag._id == link.tag));
          return tags;
        }).bind(this),
        []
      );
    }
  }
};
</script>

<style scoped>

</style>
