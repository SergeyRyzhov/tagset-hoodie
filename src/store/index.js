/* global process */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tagModule from './modules/tag'
import themeModule from './modules/theme'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        tag: tagModule,
        theme: themeModule
    },
    strict: debug,
    plugins: debug ? [] : []
})