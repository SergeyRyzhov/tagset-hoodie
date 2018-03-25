import logger from '../../core/logger.js'

export default function (hoodie) {
    const type = 'tag';

    const state = {
        all: []
    }

    const getters = {
        all: state => state.all
    }

    const actions = {
        init({
            commit
        }) {
            return hoodie.store.findAll(doc => doc.type == type)
                .then(tags => commit('setAllTags', tags))
                .catch(reason => {
                    logger.error('fail to load tags', reason);
                });
        },
        add({
            commit
        }, tagModel) {
            tagModel.type = type;
            logger.debug('tag to store', tagModel);
            return hoodie.store.add(tagModel)
                .then(tag => {
                    commit('add', tag);
                })
                .catch(reason => {
                    logger.error('fail to store tag', reason);
                });
        }
    }

    const mutations = {
        setAllTags(state, tags) {
            state.all = tags
        },
        add(state, tag) {
            state.all.push(tag);
        }
    }

    return {
        namespaced: true,
        state,
        getters,
        actions,
        mutations
    }
}