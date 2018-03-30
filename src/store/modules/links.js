import Logger from "../../core/logger.js";
const logger = Logger.getLogger('links.store');

export default function(hoodie) {
  if (!hoodie) {
    throw new Error("Please provide Hoodie");
  }

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
      remove(state, ...toRemove) {
        logger.debug("%o to remove", toRemove);
        toRemove.forEach(entity =>
          state.all.splice(state.all.indexOf(entity), 1)
        );
      }
    }
  };
}
