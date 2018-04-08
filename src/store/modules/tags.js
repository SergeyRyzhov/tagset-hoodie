import uuid from 'uuid'

import Logger from '../../core/logger.js'
import { _Array } from '../../core/sugar'

const logger = Logger.getLogger('tags.store')
const type = 'tag'

export default function (hoodie) {
  if (!hoodie) {
    throw new Error('Please provide Hoodie')
  }
  logger.trace('initialized')

  return {
    namespaced: true,
    state: {
      all: [
      ]
    },
    getters: {
      topics: (state, getters, rootState) => tag => {
        const result = rootState.links.all
          .filter(link => link.tag === tag._id)
          .reduce((topics, link) => {
            var topic = rootState.topics.all.find(topic => topic._id === link.topic)
            topic && topics.push(topic)
            return topics
          }, [])
        logger.debug('topics of tag %o tag %o', result, tag)
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
              { tag: entity._id },
              { root: true }
            )
          })
        ).then(links => {
          links = _Array.flatten(links)
          logger.debug('links were removed', links)

          return hoodie.store.remove(entities)
            .then(tags => {
              commit('remove', entities)
              return entities
            })
            .catch(reason => {
              logger.error('Failed to remove', reason)
            })
        })
      },
      addOrUpdate ({ commit, state }, entities) {
        entities = Array.isArray(entities) ? entities : [entities]
        entities = JSON.parse(JSON.stringify(entities))
        var promise = new Promise((resolve) => {
          entities.forEach(element => {
            var current = state.all.find(
              entity =>
                entity.title === element.title || entity._id === element._id
            )
            element.type = type
            element._id = current
              ? current._id
              : uuid()
          })

          hoodie.store.updateOrAdd(entities)
            .then(tags => {
              commit('addOrUpdate', tags)
              resolve(tags)
            })
            .catch(reason => {
              logger.error('Failed to save', reason)
            })
        })
        return promise
      },
      init ({commit, state}) {
        return hoodie.store.findAll(doc => doc.type === type).then(tags => {
          commit('addOrUpdate', tags)
          return tags
        })
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
