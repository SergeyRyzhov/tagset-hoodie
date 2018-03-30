import Logger from "../../core/logger.js";
import { _Array } from "../../core/sugar";
const logger = Logger.getLogger("topics.store");

export default function(hoodie) {
  if (!hoodie) {
    throw new Error("Please provide Hoodie");
  }
  logger.trace("initialized");

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
      remove(state, entities) {
        _Array.remove(state.all, entities);
      },
      addOrUpdate(state, entities) {
        _Array.addOrUpdate(state.all, entities);
      }
    }
  };
}
