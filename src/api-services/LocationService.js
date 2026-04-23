import axios from 'axios'

export default {
  sendGetAtmsLocationsRequest(cityId){
    return axios.get('/api/atm/locations',{
      headers:{Prefer:this.getPreferValue(cityId)},
      params:{
        cityId:cityId
      }
    })
  },
  getPreferValue(cityId){
    switch (cityId) {
      case 0:
        return 'code=200, example=0'
      case 2:
        return 'code=200, example=2'
      case 1:
        return 'code=404, example=1'
      default:
        return 'code=200, example=3'
    }
  }
}
