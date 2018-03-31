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

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueHoodie)

const logger = Logger.getLogger('app')

const url = 'http://localhost:8081'
var hoodie = new Hoodie({
  PouchDB,
  url
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
    service.validate(service.sharedUser)

    this.$store.dispatch('tags/init')
    this.$store.dispatch('topics/init')
    this.$store.dispatch('links/init')
  },
  render: h => h(App)
}).$mount('#app')

OfflinePluginRuntime.install()

logger.info('Application started')
