var Hapi = require('hapi')
// var hoodie = require('hoodie').register
// var PouchDB = require('pouchdb-core')
// .plugin(require('pouchdb-mapreduce'))
// .plugin(require('pouchdb-adapter-memory'))

var server = new Hapi.Server()
server.connection({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, handler) {
    handler.response('hello world')
  }
})

// server.register({
//   register: hoodie,
//   options: { // pass options here
//     inMemory: true,
//     public: 'server/public',
//     PouchDB: PouchDB
//   }
// }, function (error) {
//   if (error) {
//     throw error
//   }
// })

server.start(function (error) {
  if (error) {
    throw error
  }

  console.log(('Server running at:', server.info.uri))
})
