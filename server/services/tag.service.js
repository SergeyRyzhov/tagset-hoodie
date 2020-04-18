
var fetch = require('node-fetch')
var ig = require('instagram-scraping')

function _getStatistic (title, callback) {
  // console.log('title:', title)
  // console.log('title:', encodeURIComponent(title))
  return fetch(process.env.STATISTICS_URL + title)
    .then(function (res) {
      return res.text()
    }).then(function (body) {
      var count = 0
      try {
        // console.log('regexp: ', process.env.STATISTICS_REGEXP)
        var tagCountFinder = new RegExp(process.env.STATISTICS_REGEXP, 'igm')
        // console.log('Body:', body)
        // console.log(body.length)
        var matches = tagCountFinder.exec(body)

        count = Number(matches[1])
      } catch (e) {
        console.error('Failed to take statistic', e)
        count = -1
      }
      return ({ posts: count })
    }).catch(function (err) {
      console.error(err)
    })
}

function _scrapePostCode (code) { return ig.scrapePostCode(code) }
function _scrapePostData (post) { return ig.scrapePostData(post) }
function _scrapeTag (tag) { return ig.scrapeTag(tag) }
function _deepScrapeTagPage (tag) { return ig.deepScrapeTagPage(tag) }
function _scrapeUserPage (username) { return ig.scrapeUserPage(username) }

module.exports = {
  getStatistic: _getStatistic,
  scrapePostCode: _scrapePostCode,
  scrapePostData: _scrapePostData,
  scrapeTag: _scrapeTag,
  deepScrapeTagPage: _deepScrapeTagPage,
  scrapeUserPage: _scrapeUserPage
}
