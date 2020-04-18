var log = require('npmlog')
var Hapi = require('hapi')

var hoodiePath = 'hoodie/cli/'
var assureFolders = require(hoodiePath + 'assure-folders')
var compatibilityCheck = require(hoodiePath + 'compatibility-check.js')
var getOptions = require(hoodiePath + 'options')
var getHapiOptions = require(hoodiePath + 'hapi-options')
var parseOptions = require(hoodiePath + 'parse-options')

var hoodie = require('hoodie/server').register

var tagService = require('./services/tag.service.js')

function run (callback) {
  compatibilityCheck(function (error) {
    if (error) {
      log.error('env', error.message)
      return callback(error)
    }

    var projectPath = process.cwd()
    var options = getOptions(projectPath)

    options.address = undefined
    options.port = process.env.PORT

    options.data = 'server/.hoodie'
    options.public = 'server/public'
    options.dbAdapter = 'pouchdb-adapter-http'
    options.inMemory = false
    options.loglevel = 'warn'
    options.name = 'tagset-server'

    // console.log('OPTIONS', options)
    // console.log('ENV', process.env);

    log.level = options.loglevel
    log.verbose('app', 'Initialising')

    assureFolders(options, function (error) {
      if (error) {
        log.error('app', error.message)
        return callback(error)
      }

      var hapiOptions = getHapiOptions(options)
      hapiOptions.connection.host = '0.0.0.0'

      var server = new Hapi.Server(hapiOptions.server)
      server.connection(hapiOptions.connection)

      server.route({
        method: 'GET',
        path: '/api/statistic/{tagTitle}',
        handler: function (request, h) {
          var tagTitle = encodeURIComponent(request.params.tagTitle)
          tagService.getStatistic(tagTitle).then(statistic => {
            h.response(statistic)
          })
        }
      })

      server.route({
        method: 'GET',
        path: '/api/scraping/postCode/{code}',
        handler: function (request, h) {
          var code = encodeURIComponent(request.params.code)
          tagService.scrapePostCode(code).then(statistic => {
            h.response(statistic)
          })
        }
      })

      server.route({
        method: 'GET',
        path: '/api/scraping/postData/{post}',
        handler: function (request, h) {
          var post = encodeURIComponent(request.params.post)
          tagService.scrapePostData(post).then(statistic => {
            h.response(statistic)
          })
        }
      })

      server.route({
        method: 'GET',
        path: '/api/scraping/tag/{tag}',
        handler: function (request, h) {
          var tag = encodeURIComponent(request.params.tag)
          tagService.scrapeTag(tag).then(statistic => {
            h.response(statistic)
          })
        }
      })

      server.route({
        method: 'GET',
        path: '/api/scraping/tagPage/{tag}',
        handler: function (request, h) {
          var tag = encodeURIComponent(request.params.tag)
          tagService.deepScrapeTagPage(tag).then(statistic => {
            h.response(statistic)
          })
        }
      })

      server.route({
        method: 'GET',
        path: '/api/scraping/userPage/{usename}',
        handler: function (request, h) {
          var usename = encodeURIComponent(request.params.usename)
          tagService.scrapeUserPage(usename).then(statistic => {
            h.response(statistic)
          })
        }
      })

      server.register(
        {
          register: hoodie,
          options: parseOptions(options)
        },
        function (error) {
          if (error) {
            return callback(error)
          }

          server.start(function (error) {
            callback(error, server)
          })
        }
      )
    })
  })
}

// hoodie start.js
var emoji = require('node-emoji')
run(function (error, server) {
  if (error) {
    throw error
  }

  console.log(
    (process.platform === 'darwin' ? emoji.get('dog') + '  ' : '') +
      'Your Hoodie app has started on:',
    server.info.uri
  )
  console.log('Stop server with control + c')
})
