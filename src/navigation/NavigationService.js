import router from '@/router/index.js'

export default {
  navigateToAtmsView() {
    router.push({ name: 'atmsRoute' })
  },

  navigateToErrorView() {
    // todo: peale arendust lülita sisse
    // router.push({ name: 'errorRoute' })
  },

  navigateToNotAuthorizedView() {
    router.push({ name: 'notAuthorizedRoute' })
  },
}
