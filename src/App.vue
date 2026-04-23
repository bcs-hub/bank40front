<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 mb-4">
    <RouterLink class="navbar-brand" to="/">Bank40</RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navMenu">
      <div class="navbar-nav">
        <RouterLink class="nav-link" to="/">Kodu</RouterLink>
        <RouterLink class="nav-link" to="/atms">Pangaautomaadid</RouterLink>

        <RouterLink v-if="isLoggedIn" class="nav-link" to="/location"
          >Asukoht</RouterLink
        >
        <RouterLink v-if="isLoggedIn" @click="executeLogOut" class="nav-link" to="/"
          >Logi välja</RouterLink
        >
        <RouterLink v-else class="nav-link" to="/login">Sisse logimine</RouterLink>
      </div>
    </div>
  </nav>

  <RouterView @event-user-logged-in="updateLoggedInStatus" />
</template>

<script>
import AuthService from '@/auth/AuthService.js'

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    }
  },
  methods: {
    updateLoggedInStatus() {
      this.isLoggedIn = AuthService.isLoggedIn()
    },

    executeLogOut() {
      localStorage.removeItem('userId')
      localStorage.removeItem('roleName')
      this.updateLoggedInStatus()
    },
  },
  beforeMount() {
    this.updateLoggedInStatus()
  },
}
</script>
