import axios from 'axios'

export default {

  sendGetAtmLocations(cityId) {
   return axios.get('/api/atm/locations', {
      params: {
        cityId: cityId,
      },
    })
  },
}
