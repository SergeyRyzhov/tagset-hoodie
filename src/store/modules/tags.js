import logger from "../../core/logger.js";

export default function(hoodie) {
  if (!hoodie) {
    throw new Error("Please provide Hoodie");
  }

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
        return rootState.links.all
          .filter(link => link.tag == tag._id)
          .reduce((topics, link) => {
            topics.push(
              rootState.topics.all.find(topic => topic._id == link.topic)
            );
            return topics;
          }, []);
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
      remove(state, ...toRemove) {
        logger.debug("tags to remove", toRemove);
        toRemove.forEach(entity =>
          state.all.splice(state.all.indexOf(entity), 1)
        );
      },
      addOrUpdate(state, newEntity) {
        var index = state.all.findIndex(entity => entity._id === newEntity._id);
        if (index >= 0) state.all[index] = newEntity;
        else state.all.push(newEntity);
      }
    }
  };
}
