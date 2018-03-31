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
        { title: 'nature', _id: 'i1', rate: 10 },
        { title: 'waterfall', _id: 'i2', rate: 30 },
        { title: 'car', _id: 'i3', rate: 20 }
      ]
    },
    getters: {
      topics: (state, getters, rootState) => tag => {
        const result = rootState.links.all
          .filter(link => link.tag == tag._id)
          .reduce((topics, link) => {
            topics.push(
              rootState.topics.all.find(topic => topic._id == link.topic)
            )
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
          commit('remove', entities)
        })
      },
      addOrUpdate ({ commit, state }, entities) {
        entities = Array.isArray(entities) ? entities : [entities]
        entities = JSON.parse(JSON.stringify(entities))
        var promise = new Promise((resolve) => {
          entities.forEach(element => {
            var current = state.all.find(
              entity =>
                entity.title == element.title || entity._id == element._id
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
