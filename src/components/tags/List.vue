<template>
  <b-container fluid>
    <h1>Tags</h1>

    <b-form-group
      description=""
      label-for=""
    >
      <b-form-checkbox v-model="hideGood">
        Display only broken tags
      </b-form-checkbox>
      <b-button
        size="sm"
        :to="{ name: 'tag-create', params: { }}"
      >
        Add new
      </b-button>
      <b-form-input
        v-model="query"
        type="text"
        placeholder="Search tag"
      />
    </b-form-group>

    <b-row
      v-for="tag in tagsOfPage"
      :key="'tag' + tag._id"
    >
      <b-col cols="6">
        {{ tag.title }} ({{ tag.rate }})
      </b-col>
      <b-col cols="6">
        <b-button
          size="sm"
          :to="{ name: 'tag-view', params: { id: tag._id, tag }}"
        >
          View
        </b-button>
        <b-button
          size="sm"
          :to="{ name: 'tag-edit', params: { id: tag._id, tag }}"
        >
          Edit
        </b-button>
        <b-button
          variant="success"
          size="sm"
          @click="refreshStatistic(tag)"
        >
          Update rate
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
import statisticApi from '../../api/statistic.api.js'

import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'

export default {
  data () {
    return {
      hideGood: false,
      query: '',
      pageNumber: 1,
      pageSize: 14
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tags.all,
      topics: state => state.topics.all,
      links: state => state.links.all
    }),
    pagingSource () {
      return this.tags.filter(tag => {
        return !(this.hideGood && tag.rate > 0)
      }).filter(tag => {
        return !this.query || tag.title.indexOf(this.query) >= 0
      })
    },
    tagsOfPage () {
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
    }
  },
  watch: {
    query (newQuery) {
      this.$set(this, 'pageNumber', 1)
    }
  }
}
</script>

<style scoped>
</style>
