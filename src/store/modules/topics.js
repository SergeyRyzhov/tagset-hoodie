import Logger from '../../core/logger.js'
import { _Array } from '../../core/sugar'

const logger = Logger.getLogger('topics.store')
const type = 'topic'

export default function (hoodie) {
  if (!hoodie) {
    throw new Error('Please provide Hoodie')
  }
  logger.trace('initialized')

  return {
    namespaced: true,
    state: {
      all: [{ title: 'nature', _id: 'i1' }, { title: 'tech', _id: 'i2' }]
    },
    getters: {
      tags: (state, getters, rootState) => topic => {
        const result = rootState.links.all
          .filter(link => link.topic === topic._id)
          .reduce((tags, link) => {
            tags.push(rootState.tags.all.find(tag => tag._id === link.tag))
            return tags
          }, [])
        logger.debug('tags of topic %o tag %o', result, topic)
        return result
      },
      findWhere: state => props => {
        return state.all.find(entity => entity._id === props._id)
      }
    },
    actions: {
      remove ({ commit, dispatch }, entities) {
        entities = Array.isArray(entities) ? entities : [entities]
        entities = JSON.parse(JSON.stringify(entities))
        return Promise.all(
          entities.map(entity => {
            return dispatch(
              'links/remove',
              { topic: entity._id },
              { root: true }
            )
          })
        ).then(links => {
          links = _Array.flatten(links)
          logger.debug('links were removed', links)
          commit('remove', entities)
        })
      },
      addOrUpdate ({ commit, state }, entities) {
        entities = Array.isArray(entities) ? entities : [entities]
        entities = JSON.parse(JSON.stringify(entities))
        var promise = new Promise(resolve => {
          entities.forEach(element => {
            var current = state.all.find(
              entity =>
                entity.title === element.title || entity._id === element._id
            )
            element.type = type
            element._id = current
              ? current._id
              : 'id' + Math.random() * 1000000
          })

          commit('addOrUpdate', entities)
          resolve(entities)
        })
        return promise
      }
    },
    mutations: {
      remove (state, entities) {
        _Array.remove(state.all, entities, '_id')
      },
      addOrUpdate (state, entities) {
        _Array.addOrUpdate(state.all, entities, '_id')
      }
    }
  }
}
