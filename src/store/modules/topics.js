import Logger from "../../core/logger.js";
const logger = Logger.getLogger("topics.store");

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
        const result = rootState.links.all
          .filter(link => link.topic == topic._id)
          .reduce((tags, link) => {
            tags.push(rootState.tags.all.find(tag => tag._id == link.tag));
            return tags;
          }, []);
        logger.debug("tags of topic %o tag %o", result, topic);
        return result;
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
      remove(state, toRemove) {
        toRemove = Array.isArray(toRemove) ? toRemove : [toRemove];
        logger.debug("remove %o from %o", toRemove, state.all);
        toRemove.forEach(entity => {
          let index = state.all.indexOf(entity);
          if (index >= 0) state.all.splice(index, 1);
        });
      }
    }
  };
}
