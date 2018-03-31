import Axios from 'axios'

function getStatistics (title) {
  return Axios.get('/api/statistic/' + encodeURIComponent(title)).then(
    response => {
      return response.data
    }
  )
}

export default {
  getStatistics
}
