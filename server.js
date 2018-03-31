var log = require('npmlog')
var Hapi = require('hapi')

var hoodiePath = 'hoodie/cli/'
var assureFolders = require(hoodiePath+'assure-folders')
var compatibilityCheck = require(hoodiePath+'compatibility-check.js')
var getOptions = require(hoodiePath+'options')
var getHapiOptions = require(hoodiePath+'hapi-options')
var parseOptions = require(hoodiePath+'parse-options')

var hoodie = require('hoodie/server').register

function run (callback) {
  compatibilityCheck(function (error) {
    if (error) {
      log.error('env', error.message)
      return callback(error)
    }

    var projectPath = process.cwd()
    var options = getOptions(projectPath)

    options.address = process.env.ADDRESS;
    options.port = process.env.PORT;
    console.log('OPTIONS', options);

    console.log('ENV', process.env);

    log.level = options.loglevel
    log.verbose('app', 'Initialising')

    assureFolders(options, function (error) {
      if (error) {
        log.error('app', error.message)
        return callback(error)
      }

      var hapiOptions = getHapiOptions(options)
      var server = new Hapi.Server(hapiOptions.server)
      server.connection(hapiOptions.connection)

      server.register({
        register: hoodie,
        options: parseOptions(options)
      }, function (error) {
        if (error) {
          return callback(error)
        }

        server.start(function (error) {
          callback(error, server)
        })
      })
    })
  })
}

//hoodie start.js
var emoji = require('node-emoji')
run(function (error, server) {
  if (error) {
    throw error
  }

  console.log((process.platform === 'darwin' ? emoji.get('dog') + '  ' : '') + 'Your Hoodie app has started on:', server.info.uri)
  console.log('Stop server with control + c')
})
