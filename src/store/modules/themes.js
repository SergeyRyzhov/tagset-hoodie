// import hoodie from '../hoodie.js'
import logger from '../../core/logger.js'

export default function (hoodie) {
    const type = 'theme';

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
                .then(themes => commit('setAllThemes', themes))
                .catch(reason => {
                    logger.error('fail to load themes', reason);
                });
        },
        add({
            commit
        }, themeModel) {
            themeModel.type = type;
            logger.debug('theme to store', themeModel);
            return hoodie.store.add(themeModel)
                .then(theme => {
                    commit('add', theme);
                })
                .catch(reason => {
                    logger.error('fail to store theme', reason);
                });
        }
    }

    const mutations = {
        setAllThemes(state, themes) {
            state.all = themes
        },
        add(state, theme) {
            state.all.push(theme);
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