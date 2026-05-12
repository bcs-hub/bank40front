import router from '@/router/index.js'

export default {
  navigateToAtmsView(successMessage) {
    router.push({ name: 'atmsRoute', query: successMessage ? { successMessage } : undefined })
  },

  navigateToLocationView(locationId) {
    router.push({ name: 'locationRoute', query: { locationId: locationId } })
  },

  navigateToErrorView() {
    // todo: peale arendust lülita sisse
    // router.push({ name: 'errorRoute' })
  },

  navigateToNotAuthorizedView() {
    router.push({ name: 'notAuthorizedRoute' })
  },
}
