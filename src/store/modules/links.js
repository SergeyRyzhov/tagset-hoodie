import Logger from "../../core/logger.js";
import { _Array } from "../../core/sugar";
const logger = Logger.getLogger("links.store");

export default function(hoodie) {
  if (!hoodie) {
    throw new Error("Please provide Hoodie");
  }
  logger.trace("initialized");

  return {
    namespaced: true,
    state: {
      all: [
        {
          topic: "i1",
          tag: "i1"
        },
        {
          topic: "i1",
          tag: "i2"
        },
        {
          topic: "i2",
          tag: "i2"
        },
        {
          topic: "i2",
          tag: "i3"
        }
      ]
    },
    getters: {
      findWhere: state => props => {
        return state.all.find(entity => entity._id === props._id);
      }
    },
    actions: {
      remove({ commit, state }, props) {
        var promise = new Promise(resolve => {
          const { topic, tag } = {
            topic: props.topic ? props.topic._id || props.topic : null,
            tag: props.tag ? props.tag._id || props.tag : null
          };
          var toRemove = state.all.filter(
            entity =>
              (entity.topic === topic && !tag) ||
              (entity.tag === tag && !topic) ||
              (entity.topic === topic && entity.tag === tag)
          );
          commit("remove", toRemove);

          resolve(toRemove);
        });
        return promise;
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
