const state = {
    all: []
}

const getters = {
    allTags: state => state.all
}

const actions = {
    getAllTags({
        commit
    }) {
        commit('setTags', [])
    }
}

const mutations = {
    setTags(state, tags) {
        state.all = tags
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}