<template>
  <div>
    <!-- topics -->
    <h1>Topics</h1>
    <div v-for="topic in topics" :key="'topic' + topic._id" style="display: inline;">
      <b-button size="sm" :variant="!selectedTopics.hasOwnProperty(topic._id) ? 'primary' : 'warning'" @click="toggleTopic(topic)">{{topic.title}}</b-button>
    </div>

    <!-- advanced -->
    <h1>Configure</h1>
    Full details: <input type="checkbox" v-model="detailed"/>
    <br/>
    Goal count: <input type="number" min="1" step="1" v-model="goal"/>
      <b-button variant="success" size="sm" @click="selectBest">Select best</b-button>
    <br/>
    <b-alert show :variant="improvements.alertType">Current set: {{ score.amount }} tags with average rate {{ score.average | float }} ({{ improvements.delta | float }})</b-alert>
    <div v-for="topic in selectedTopics" :key="'s-topic-tags' + topic._id">
      <b-button variant="danger" size="sm" @click="toggleTopic(topic)">{{ topic.title }}</b-button>
      <div v-for=" tag in tagsOfTopic(topic)" :key="'tag' + tag._id" style="display: inline;">
        <b-button variant="outline-success" size="sm" :pressed="selectedTags.hasOwnProperty(tag._id)" @click="toggleTag(tag, topic)">{{tag.title}}</b-button>
        <span v-if="detailed">{{tag.rate}}</span>
      </div>
    </div>

    <!-- result and copy to-->
    <h1>Results</h1>
    <div>
      <p>
        <textarea v-model="combinedTags" rows="4" cols="35" style="min-width: 100%;"></textarea>
      </p>
      <b-button variant="primary" size="sm" @click="combine">Preview</b-button>
      <b-button variant="success" size="sm" @click="toBuffer" :disabled="combinedTags.length == 0">Copy to buffer</b-button>
    </div>
  </div>
</template>

<script>
  import clipboard from 'clipboard-polyfill'
import { _Array } from '../../core/sugar'
import {
    mapState
  } from 'vuex'

export default {
    data () {
      return {
        selectedTopics: {},
        selectedTags: {},
        detailed: false,
        goal: 28,

        improvements: {
          alertType: 'primary',
          grow: false,
          delta: 0
        },
        combinedTags: ''
      }
    },
    computed: {
      ...mapState({
        topics: state => state.topics.all,
        tags: state => state.tags.all,
        links: state => state.links.all
      }),
      score () {
        var selectedTags = Object.values(this.selectedTags)
        var amount = selectedTags.length
        var average = selectedTags.reduce((sum, tag) => { sum += tag.rate / amount; return sum }, 0)
        return {
          average,
          amount
        }
      }
    },
    watch: {
      score (newScore, oldScore) {
        var delta = newScore.average - oldScore.average
        this.$set(this.improvements, 'grow', delta > 0)
        this.$set(this.improvements, 'alertType',
          Object.values(this.selectedTags).length > this.goal
            ? 'danger'
            : delta > 0
              ? 'success'
              : 'warning')
        this.$set(this.improvements, 'delta', delta)
      }
    },
    methods: {
      toggleTopic (topic) {
        if (this.selectedTopics.hasOwnProperty(topic._id)) {
          this.tagsOfTopic(topic).forEach(tag => {
            if (this.selectedTags.hasOwnProperty(tag._id)) {
              this.$delete(this.selectedTags, tag._id)
            }
          })
          this.$delete(this.selectedTopics, topic._id)
        } else {
          this.$set(this.selectedTopics, topic._id, topic)
          var goal = this.goal - Object.keys(this.selectedTags).length
          goal = Math.max(0, goal)
          this.tagsOfTopic(topic).forEach(tag => {
            if (goal-- > 0) {
              this.$set(this.selectedTags, tag._id, tag)
            }
          })
        }
      },
      toggleTag (tag, topic) {
        if (this.selectedTags.hasOwnProperty(tag._id)) {
          this.$delete(this.selectedTags, tag._id)
        } else {
          this.$set(this.selectedTags, tag._id, tag)
        }
      },
      selectBest () {
        var allTags = Object.values(this.selectedTopics).reduce((tags, topic) => { tags.push(this.tagsOfTopic(topic)); return tags }, [])
        allTags = _Array.flatten(allTags)
        var best = allTags
          .filter(function uniq (value, index, self) {
            return self.indexOf(value) === index
          })
          .sort((a, b) => b.rate - a.rate)
          .slice(0, this.goal)
        Object.keys(this.selectedTags).forEach(tagId => {
          this.$delete(this.selectedTags, tagId)
        })
        best.forEach(tag => {
          this.$set(this.selectedTags, tag._id, tag)
        })
      },
      combine () {
        let tags = Object.values(this.selectedTags)
        let combinedTags = tags
          .map(tag => '#' + tag.title)
          .join(' ')
        this.$set(this, 'combinedTags', combinedTags.trim())
      },
      toBuffer () {
        clipboard.writeText(this.combinedTags)
      },
      tagsOfTopic (topic) {
        return this.links.filter(link => link.topic === topic._id).reduce(
          (tags, link) => {
            var item = this.tags.find(tag => tag._id === link.tag)
            item && tags.push(item)
            return tags
          }, []
        ).sort((a, b) => b.rate - a.rate)
      }
    },
    filters: {
      float: function (value) {
        if (!value) return '0'
        value = Number(value)
        return value.toFixed(2)
      }
    }
  }
</script>

<style scoped>
</style>
