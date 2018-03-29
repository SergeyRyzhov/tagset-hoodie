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
      remove({ commit }, props) {
        props.topic = props.topic ? props.topic._id : props.topic;
        props.tag = props.tag._id || props.tag;
        commit("remove", props);
      }
    },
    mutations: {
      remove(state, { topic, tag }) {
        var index = state.all.findIndex(
          entity => entity.topic === topic && entity.tag === tag
        );
        if (index >= 0) state.all.splice(index, 1);
      }
    }
  };
}
