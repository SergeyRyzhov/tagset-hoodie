import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueHoodie from 'vue-hoodie'
import Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import './scss/theme.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'octicons/build/build.css'

import App from './App.vue'
import StoreFactory from './store'
import AccountService from './core/account.js'
import Logger from './core/logger.js'
import Config from './config.js'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueHoodie)

const logger = Logger.getLogger('app')

var hoodie = new Hoodie({
  PouchDB,
  url: Config.serverUrl
})

hoodie.connectionStatus.startChecking({
  interval: {
    connected: 60000,
    disconnected: 10000
  }
})

Vue.config.productionTip = false
// Vue.config.errorHandler = () => {
//   logger.error(arguments);
// hoodie.connectionStatus.check();
// }

new Vue({
  store: StoreFactory(hoodie),
  hoodie,
  created () {
    var service = AccountService(this.$hoodie)
    this.$hoodie.store.connect().then((object) => {
      service.validate(service.sharedUser).then(() => {
        Promise.all([
          this.$store.dispatch('tags/init'),
          this.$store.dispatch('topics/init'),
          this.$store.dispatch('links/init')]).then(args => {
          logger.info('stores initialized', args)

        // this.$hoodie.store.on('pull', function (object) { logger.info('pull', object) })
        // this.$hoodie.store.on('push', function (object) { logger.info('push', object) })
        // this.$hoodie.store.on('connect', function (object) { logger.info('connect', object) })
        // this.$hoodie.store.on('disconnect', function (object) { logger.info('disconnect', object) })
        })
      })
    })
  },
  render: h => h(App)
}).$mount('#app')

OfflinePluginRuntime.install()

logger.info('Application started')
