<template>
  <b-container fluid>
    <h1>Topics</h1>

    <b-form-group
      description=""
      label-for=""
    >
      <b-button
        size="sm"
        :to="{ name: 'topic-create', params: { }}"
      >
        Add new
      </b-button>
      <b-form-input
        v-model="query"
        type="text"
        placeholder="Search topic"
      />
    </b-form-group>

    <b-row
      v-for="topic in topicsOfPage"
      :key="'topic' + topic._id"
    >
      <b-col cols="8">
        {{ topic.title }}
      </b-col>
      <b-col cols="4">
        <b-button
          size="sm"
          :to="{ name: 'topic-view', params: { id: topic._id, topic }}"
        >
          View
        </b-button>
        <b-button
          size="sm"
          :to="{ name: 'topic-edit', params: { id: topic._id, topic }}"
        >
          Edit
        </b-button>
      </b-col>
    </b-row>

    <b-pagination
      v-if="pagingSource.length > pageSize"
      v-model="pageNumber"
      :total-rows="pagingSource.length"
      :per-page="pageSize"
    />
  </b-container>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
      query: '',
      pageNumber: 1,
      pageSize: 14
    }
  },
  computed: {
    ...mapState({
      topics: state => state.topics.all,
      tags: state => state.tags.all,
      links: state => state.links.all
    }),
    pagingSource () {
      return this.topics.filter(topic => {
        return !this.query || topic.title.indexOf(this.query) >= 0
      })
    },
    topicsOfPage () {
      if (this.pagingSource.length === 0) {
        return []
      }

      let page = []
      for (let index = (this.pageNumber - 1) * this.pageSize; index < Math.min(this.pagingSource.length, this.pageNumber * this.pageSize); index++) {
        const element = this.pagingSource[index]
        page.push(element)
      }
      return page
    }
  },
  watch: {
    query (newQuery) {
      this.$set(this, 'pageNumber', 1)
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
