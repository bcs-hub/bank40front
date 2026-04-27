import axios from 'axios'

export default {

  sendPostAtmLocation(location) {
    return axios.post('/api/atm/location', location )
  },

  sendGetAtmLocations(cityId) {
    return axios.get('/api/atm/locations', {
      headers: { Prefer: this.getPreferValue(cityId) },
      params: {
        cityId: cityId,
      },
    })
  },

  // todo: kustuta, kui enam pole stoplighti vaja
  getPreferValue(cityId) {
    switch (cityId) {
      case 0:
        return 'code=200, example=0'
      case 2:
        return 'code=200, example=2'
      case 3:
        return 'code=200, example=3'
      default:
        return 'code=404, example=1'
    }
  },
}
