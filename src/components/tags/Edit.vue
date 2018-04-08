<template>
  <div>
    <h1>Edit tag and topics</h1>
    <div v-if="tag">
    <h2>{{ tag.title }}</h2>
    <div>
      Edit details:
      <form @submit.prevent="save(tag)">
        Title:
        <input type="text" v-model="tag.title" />
        <br/>
        Rate:
        <input type="number" v-model="tag.rate" />
        <br/>
        <b-button variant="primary" size="sm" @click="loadStatistic(tag)">Fetch information</b-button>
        <b-button variant="success" size="sm" type="submit"> Save</b-button>
      </form>
    </div>
    <div>
      Remove tag:
      <b-button variant="danger" size="sm" @click="remove(tag)">{{ tag.title }}</b-button>
    </div>
    <div>
      Remove tag from topics:
      <div v-for="topic in topics(tag)" :key="'topic' + topic._id" style="display: inline;">
        <b-button variant="danger" size="sm" @click="removeLink({topic, tag})">{{topic.title}}</b-button>
      </div>
    </div> </div>
  </div>
</template>

<script>
  import Logger from '../../core/logger.js'
  import statisticApi from '../../api/statistic.api.js'

  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'

  const logger = Logger.getLogger('tags.edit.component')

  function defaultForm (tag) {
    tag = tag || {}
    return {
      _id: tag._id || null,
      title: tag.title || '',
      rate: tag.rate || 0
    }
  }
  export default {
    data () {
      return {
        form: defaultForm()
      }
    },
    mounted () { },
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

        if (x) {
          this.$set(this, 'form', defaultForm(x))
        }
      }
    },
    methods: {
      ...mapActions({
        remove: 'tags/remove',
        saveToDb: 'tags/addOrUpdate',
        removeLink: 'links/remove'
      }),
      ...mapMutations({}),
      save (form) {
        logger.debug('form to save %o', form)
        this.saveToDb(form).then(tag => {
          logger.debug('new tag %o', tag)
          this.$router.push({
            path: '/tags'
          })
        })
      },
      loadStatistic () {
        statisticApi.getStatistics(this.tag.title).then(statistic => {
          this.$set(this.tag, 'rate', statistic.posts)
        })
      }
    }
  }
</script>
