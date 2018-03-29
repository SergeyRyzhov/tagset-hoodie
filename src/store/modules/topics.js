export default function(hoodie) {
  if (!hoodie) {
    throw new Error("Please provide Hoodie");
  }

  return {
    namespaced: true,
    state: {
      all: [{ title: "nature", _id: "i1" }, { title: "tech", _id: "i2" }]
    },
    getters: {
      tags: (state, getters, rootState) => topic => {
        return rootState.links.all
          .filter(link => link.topic == topic._id)
          .reduce((tags, link) => {
            tags.push(rootState.tags.all.find(tag => tag._id == link.tag));
            return tags;
          }, []);
      },
      findWhere: (state /*, getters, rootState*/) => props => {
        return state.all.find(entity => entity._id === props._id);
      }
    },
    actions: {
      // dispatch('module/x')
      // action({ state, commit, rootState }, props) {
      //   commit("action", props);
      // }
    },
    mutations: {
      // commit('module/x')
      // select(state, { _id }) {
      // }
    }
  };
}
