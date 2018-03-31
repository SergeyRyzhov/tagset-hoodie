import Vuex from 'vuex'

import tagsModule from './modules/tags.js'
import topicsModule from './modules/topics.js'
import linksModule from './modules/links.js'

export default function (hoodie) {
  return new Vuex.Store({
    modules: {
      tags: tagsModule(hoodie),
      topics: topicsModule(hoodie),
      links: linksModule(hoodie)
    },
    state: {

    },
    actions: {
      sync () {
        return hoodie.store.sync()
      }
    },
    mutations: {},
    strict: true
  })
}
