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
        updateOrAdd({
            commit
        }, tagModel) {
            tagModel.type = type;
            logger.debug('tag to store', tagModel);
            return hoodie.store.updateOrAdd(tagModel)
                .then(tag => {
                    commit('updateOrAdd', tag);
                })
                .catch(reason => {
                    logger.error('fail to store tag', reason);
                });
        },
        remove({
            commit
        }, tagModel) {
            tagModel.type = type;
            logger.debug('tag to remove', tagModel);
            return hoodie.store.remove(tagModel)
                .then(() => {
                    commit('remove', tagModel);
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
        updateOrAdd(state, tag) {
            var index = state.all.findIndex(i => i._id == tag._id);
            if (index >= 0)
                state.all[0] = tag;
            else
                state.all.push(tag);
        },
        remove(state, tag) {
            var index = state.all.indexOf(tag);
            if (index >= 0)
               state.all.slice(index, 1);
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