import Logger from "../../core/logger.js";
import { _Array } from "../../core/sugar";
const logger = Logger.getLogger("tags.store");

export default function(hoodie) {
  if (!hoodie) {
    throw new Error("Please provide Hoodie");
  }
  logger.trace("initialized");

  return {
    namespaced: true,
    state: {
      all: [
        { title: "nature", _id: "i1", rate: 10 },
        { title: "waterfall", _id: "i2", rate: 30 },
        { title: "car", _id: "i3", rate: 20 }
      ]
    },
    getters: {
      topics: (state, getters, rootState) => tag => {
        const result = rootState.links.all
          .filter(link => link.tag == tag._id)
          .reduce((topics, link) => {
            topics.push(
              rootState.topics.all.find(topic => topic._id == link.topic)
            );
            return topics;
          }, []);
        logger.debug("topics of tag %o tag %o", result, tag);
        return result;
      },
      findWhere: state => props => {
        return state.all.find(entity => entity._id === props._id);
      }
    },
    actions: {
      remove({ commit, dispatch }, props) {
        dispatch("links/remove", { tag: props._id }, { root: true }).then(
          links => {
            logger.debug("links were removed", links);
            commit("remove", props);
          }
        );
      },
      addOrUpdate({ commit }, props) {
        props = JSON.parse(JSON.stringify(props));
        props.type = "tag";
        props._id = "id" + Math.random() * 1000000;
        commit("addOrUpdate", props);
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
