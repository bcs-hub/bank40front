import router from '@/router/index.js'

export default {

  navigateToAtmsView() {
    router.push({ name: 'atmsRoute' })
  },

  navigateToErrorView() {
    router.push({ name: 'errorRoute' })
  },

}
