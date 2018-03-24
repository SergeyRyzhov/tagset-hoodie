const state = {
  all: []
}

const getters = {
  allThemes: state => state.all
}

const actions = {
  getAllThemes({
    commit
  }) {
    commit('setThemes', [])
  }
}

const mutations = {
  setThemes(state, themes) {
    state.all = themes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}