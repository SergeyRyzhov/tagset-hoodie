/* global process */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tagModule from './modules/tags'
import themeModule from './modules/themes'

import actions from './actions.js'

const debug = process.env.NODE_ENV !== 'production'

const state = {}

export default function (hoodie) {
    return new Vuex.Store({
        modules: {
            tags: tagModule(hoodie),
            themes: themeModule(hoodie)
        },
        state,
        actions: actions(hoodie),
        strict: debug,
        plugins: debug ? [] : []
    });
}