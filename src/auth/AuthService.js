export default {

  isLoggedIn() {
    return localStorage.getItem('userId') !== null  // '1', null
  },

}
