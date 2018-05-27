<template>
  <b-container fluid>
    <h1>Please sign in</h1>

    <!--<b-form-group description="Login with existing account">
      <b-form-input v-model="email" type="text" placeholder="Email address"></b-form-input>
      <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
      <b-button variant="success" right size="sm" @click="signIn()">Sign in</b-button>
    </b-form-group>

    <b-form-group description="Create an account">
      <b-form-input v-model="signUpForm.email" type="text" placeholder="Email address"></b-form-input>
      <b-form-input v-model="signUpForm.password" type="password" placeholder="Password"></b-form-input>
      <b-button variant="success" right size="sm" @click="signUp()">Sign up</b-button>
    </b-form-group>-->
  </b-container>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        email: '',
        password: '',

        signUpForm: {
          email: '',
          password: ''
        }
      }
    },
    mounted () {
      const user = firebase.auth().currentUser
      if (user) {
        this.$router.replace('/')
      }
    },
    methods:
      {
        signUp: function () {
          firebase.auth()
            .createUserWithEmailAndPassword(this.signUp.email, this.signUp.password)
            .then(user => { this.$router.replace('/') },
              error => { alert(error.message) }
            )
        },
        signIn: function () {
          firebase.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(user => { this.$router.replace('/') },
              error => { alert(error.message) })
        }
      }
  }
</script>

<style scoped>
</style>