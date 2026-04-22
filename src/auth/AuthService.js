import NavigationService from '@/navigation/NavigationService.js'

export default {

  isLoggedIn() {
    return localStorage.getItem('userId') !== null // '1', null
  },

  getLoggedInUserId() {
    if (!this.isLoggedIn()) {
      NavigationService.navigateToNotAuthorizedView()
    }
    return Number(localStorage.getItem('userId'))
  },

}
