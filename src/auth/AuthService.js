import NavigationService from '@/navigation/NavigationService.js'

export default {
  isLoggedIn() {
    return localStorage.getItem('userId') !== null // '1', null
  },

  getLoggedInUserId() {
    this.validateUserIsLoggedIn()
    return Number(localStorage.getItem('userId'))
  },

  getLoggedInUserRoleName() {
    this.validateUserIsLoggedIn()
    return localStorage.getItem('roleName')
  },

  validateUserIsLoggedIn() {
    if (!this.isLoggedIn()) {
      NavigationService.navigateToNotAuthorizedView()
    }
  },
}
