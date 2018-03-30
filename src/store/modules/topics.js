import Logger from "../../core/logger.js";
const logger = Logger.getLogger('topics.store');

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
      findWhere: state => props => {
        return state.all.find(entity => entity._id === props._id);
      }
    },
    actions: {
      remove({ commit, dispatch }, props) {
        dispatch("links/remove", { topic: props._id }, { root: true }).then(
          links => {
            logger.debug("links were removed", links);
            commit("remove", props);
          }
        );
      }
    },
    mutations: {
      remove(state, ...toRemove) {
        logger.debug("%o to remove", toRemove);
        toRemove.forEach(entity =>
          state.all.splice(state.all.indexOf(entity), 1)
        );
      }
    }
  };
}
