import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueHoodie from 'vue-hoodie'
import Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(VueHoodie);

import App from './App.vue'
import StoreFactory from './store'
import AccountService from './store/account.js'

const url = "http://localhost:8081"
var hoodie = new Hoodie({
  PouchDB,
  url
});

Vue.config.productionTip = false

new Vue({
  store: StoreFactory(hoodie),
  hoodie,
  created() {
    var service = AccountService(this.$hoodie);
    service.validate(service.sharedUser);
  },
  render: h => h(App)
}).$mount('#app')

OfflinePluginRuntime.install();