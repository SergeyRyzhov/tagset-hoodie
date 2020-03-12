<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="info"
  >
    <b-navbar-toggle target="nav_collapse" />

    <b-navbar-brand :to="{ path: '/' }">
      <!-- <img src="../assets/logo.png" alt=""/> -->
      TAG#SET
    </b-navbar-brand>
    <b-collapse
      id="nav_collapse"
      is-nav
    >
      <b-navbar-nav>
        <b-nav-item :to="{ path: '/home' }">
          Home
        </b-nav-item>
        <b-nav-item :to="{ path: '/topics' }">
          Topics
        </b-nav-item>
        <b-nav-item :to="{ path: '/tags' }">
          Tags
        </b-nav-item>
        <b-nav-item :to="{ path: '/history' }">
          History
        </b-nav-item>
        <b-nav-item :to="{ path: '/statistic' }">
          Statistic
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="!user">
          <b-form-group>
            <b-form-input
              v-model="email"
              size="sm"
              class="mr-sm-2"
              type="text"
              placeholder="Email address"
            />
            <b-form-input
              v-model="password"
              size="sm"
              class="mr-sm-2"
              type="password"
              placeholder="Password"
            />
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              @click="signIn"
            >
              Sign in
            </b-button>
          </b-form-group>
        </b-nav-form>
        <!--<b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>-->
      </b-navbar-nav>
    </b-collapse>
    <b-nav-text
      v-if="!connectionStatus"
      right
      style="cursor:pointer;"
      @click="checkStatus"
    >
      <i
        style="color:#dc354587;"
        v-html="octicons.alert.toSVG()"
      /> Offilne mode
    </b-nav-text>
  </b-navbar>
</template>

<script>
import Logger from '../core/logger.js'
import octicons from 'octicons'
import firebase from 'firebase'

const logger = Logger.getLogger('navigator.component')

export default {
  name: 'Navigator',
  data () {
    return {
      connectionStatus: true,
      octicons,
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return firebase.auth().currentUser
    }
  },
  mounted () {
    var status = this.$hoodie.connectionStatus
    status.on('reconnect', this.connected.bind(this))
    status.on('reset', this.connected.bind(this))
    status.on('disconnect', this.disconnected.bind(this))
    this.checkStatus()
  },
  methods: {
    checkStatus () {
      var status = this.$hoodie.connectionStatus
      status.check()
    },
    connected () {
      logger.info('API status: online')
      this.$set(this, 'connectionStatus', true)
    },
    disconnected () {
      logger.info('API status: offline')
      this.$set(this, 'connectionStatus', false)
    },
    signUp: function () {
      firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('/')
        },
        error => { alert(error.message) }
        )
    },
    signIn: function () {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('/')
        },
        error => { alert(error.message) })
    }
  }
}
</script>
