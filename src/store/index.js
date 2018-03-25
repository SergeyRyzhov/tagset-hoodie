import Vuex from 'vuex'

import tagModule from './modules/tags'
import themeModule from './modules/themes'
import actions from './actions.js'

const state = {}

export default function (hoodie) {
    return new Vuex.Store({
        modules: {
            tags: tagModule(hoodie),
            themes: themeModule(hoodie)
        },
        state,
        actions: actions(hoodie),
        strict: true
    });
}