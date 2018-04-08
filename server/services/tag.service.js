
var fetch = require('node-fetch')

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

module.exports = {
  getStatistic: _getStatistic
}
