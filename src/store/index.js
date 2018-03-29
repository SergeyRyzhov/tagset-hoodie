import Vuex from "vuex";

// import tagModule from './modules/tags'
import topicsModule from "./modules/topics.js";

const rootState = {
  tags: {
    all: [
      { title: "nature", _id: "i1", rate: 10 },
      { title: "waterfall", _id: "i2", rate: 30 },
      { title: "car", _id: "i3", rate: 20 }
    ]
  },
  links: {
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
  }
};

export default function(hoodie) {
  return new Vuex.Store({
    modules: {
      // tag: tagModule(hoodie),
      topics: topicsModule(hoodie)
    },
    state: rootState,
    actions: {
      sync() {
        return hoodie.store.sync();
      }
    },
    mutations: {},
    strict: true
  });
}
