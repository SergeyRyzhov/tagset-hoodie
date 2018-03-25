/* global process */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tagModule from './modules/tags'
import themeModule from './modules/themes'

import actions from './actions.js'
//import hoodie from './hoodie.js'
import account from './account.js'

const debug = process.env.NODE_ENV !== 'production'

account.validate(account.sharedUser);

export default new Vuex.Store({
    modules: {
        tags: tagModule,
        themes: themeModule
    },
    actions,
    strict: debug,
    plugins: debug ? [] : []
})