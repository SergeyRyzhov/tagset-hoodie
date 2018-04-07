import Axios from 'axios'
import Config from '../config.js'

function getStatistics (title) {
  return Axios.get(Config.serverUrl + '/api/statistic/' + encodeURIComponent(title)).then(
    response => {
      return response.data
    }
  )
}

export default {
  getStatistics
}
