import Logger from "../../core/logger.js";
import { _Array } from "../../core/sugar";

const logger = Logger.getLogger("links.store");
const type = "link";

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
      remove({ commit, state }, entities) {
        commit && logger.debug("");

        entities = Array.isArray(entities) ? entities : [entities];
        entities = JSON.parse(JSON.stringify(entities));
        return Promise.all(
          entities.map(props => {
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

              resolve(toRemove);
            });
            return promise;
          })
        ).then(links => {
          if (links.length > 0) {
            commit("remove", links);
            logger.debug("links were removed", links);
          }
          return links;
        });
      },
      addOrUpdate({ commit, state }, entities) {
        entities = Array.isArray(entities) ? entities : [entities];
        entities = JSON.parse(JSON.stringify(entities));
        var promise = new Promise(resolve => {
          entities.forEach(element => {
            var current = state.all.find(
              entity =>
                (entity.topic == element.topic && entity.tag == element.tag) ||
                entity._id == element._id
            );
            element.type = type;
            element._id = current
              ? current._id
              : "id" + Math.random() * 1000000;
          });

          commit("addOrUpdate", entities);
          resolve(entities);
        });
        return promise;
      }
    },
    mutations: {
      remove(state, entities) {
        _Array.remove(state.all, entities, ['topic', 'tag']);
      },
      addOrUpdate(state, entities) {
        _Array.addOrUpdate(state.all, entities, "_id");
      }
    }
  };
}
