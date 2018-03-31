<template>
  <div>
    <!-- topics -->
    <h1>Topics</h1>
    <div v-for="topic in topics" :key="'topic' + topic._id" style="display: inline;">
      <b-button :variant="!selectedTopics.hasOwnProperty(topic._id)?'primary':'warning'" @click="toggleTopic(topic)">{{topic.title}}</b-button>
    </div>

    <!-- advanced -->
    <h1>Configure</h1>
    <div v-for="topic in selectedTopics" :key="'s-topic-tags' + topic._id">
      <b-button variant="danger" size="sm" @click="toggleTopic(topic)">{{ topic.title }}</b-button>
      <div v-for=" {tag, include} in selectedTags[topic._id]" :key="'tag' + tag._id" style="display: inline;">
        <b-button variant="outline-success" size="sm" :pressed.sync="include" @click="toggleTag(topic, tag)">{{tag.title}}</b-button>
      </div>
    </div>

    <!-- result and copy to-->
    <h1>Results</h1>
    <div>
      <p>
        <textarea v-model="combinedTags"></textarea>
      </p>
      <b-button variant="primary" size="sm" @click="combine">Preview</b-button>
      <b-button variant="success" size="sm" @click="toBuffer">Copy to buffer</b-button>
    </div>
  </div>
</template>

<script>
  import clipboard from 'clipboard-polyfill'
import {
    mapState
  } from 'vuex'

export default {
    data () {
      return {
        selectedTopics: {},
        selectedTags: {},

        combinedTags: ''
      }
  },
    computed: {
      ...mapState({
        topics: state => state.topics.all,
        tags: state => state.tags.all,
        links: state => state.links.all
      })
    },
    methods: {
      toggleTopic (topic) {
        debugger
        if (this.selectedTopics.hasOwnProperty(topic._id)) {
          this.$delete(this.selectedTags, topic._id)
          this.$delete(this.selectedTopics, topic._id)
        } else {
          this.$set(this.selectedTopics, topic._id, topic)
          this.$set(
            this.selectedTags,
            topic._id,
            this._tagsOfTopic(topic)
              .sort((a, b) => b.rate - a.rate)
              .reduce(function (result, tag) {
                result[tag._id] = {
                  tag,
                  include: true
                }
                return result
              }, {})
          )
        }
      },
      toggleTag (topic, tag) {
        const {
          include
        } = this.selectedTags[topic._id][tag._id]
        this.$set(this.selectedTags[topic._id][tag._id], 'include', !include)
      },
      combine () {
        let tags = []
        for (const topicId in this.selectedTags) {
          for (const tagId in this.selectedTags[topicId]) {
            const {
              tag,
              include
            } = this.selectedTags[topicId][tagId]
            if (!include) continue
            tags.push(tag)
          }
        }
        let combinedTags = tags
          .filter(function uniq (value, index, self) {
            return self.indexOf(value) === index
          })
          .sort((a, b) => b.rate - a.rate)
          .map(tag => '#' + tag.title)
          .join(' ')
        this.$set(this, 'combinedTags', combinedTags.trim())
      },
      toBuffer () {
        clipboard.writeText(this.combinedTags)
      },
      _tagsOfTopic (topic) {
        return this.links.filter(link => link.topic == topic._id).reduce(
          (tags, link) => {
            tags.push(this.tags.find(tag => tag._id == link.tag))
            return tags
          }, []
        )
      }
    }
  }
</script>

<style scoped>
</style>