import axios from 'axios'

export default {

  sendGetLoginRequest(username, password) {
    return axios.get('/api/login', {
      headers: { Prefer: this.getPreferValue(username) },
      params: {
        username: username,
        password: password,
      },
    })
  },

  // todo: kustuta, kui enam pole stoplighti vaja
  getPreferValue(username) {
    switch (username) {
      case 'admin':
        return 'code=200, example=admin'
      case 'error':
        return 'code=403, example=error'
      default:
        return 'code=200, example=rain'
    }
  },
}
