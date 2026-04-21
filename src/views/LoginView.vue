<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-6">
        <AlertError :error-message="errorMessage" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-3">
        <h1 class="mb-3">Sisse logimine</h1>
        <div class="form-floating mb-3">
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder="Kasutajanimi"
          />
          <label for="inputUsername">Kasutajanimi</label>
        </div>
        <div class="form-floating mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Parool"
          />
          <label for="inputPassword">Parool</label>
        </div>

        <button v-if="showSpinner" class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Login sisse...</span>
        </button>
        <button v-else @click="login" type="submit" class="btn btn-outline-secondary">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertError from '@/components/AlertError.vue'
import LoginService from '@/services/LoginService.js'

export default {
  name: 'LoginView',
  components: { AlertError },
  data() {
    return {
      showSpinner: false,

      username: '',
      password: '',
      errorMessage: '',

      loginResponse: {
        userId: 0,
        roleName: '',
      },

      errorResponse: {
        message: '',
        errorCode: 0,
      },
    }
  },
  methods: {
    login() {
      this.startSpinner()
      this.resetErrorMessage()
      if (this.allFormFieldsAreCorrect()) {
        LoginService.sendGetLoginRequest(this.username, this.password)
          .then((response) => this.handleLoginResponse(response))
          .catch((error) => this.handleLoginError(error))
          .finally(() => this.stopSpinner())
      } else {
        this.errorMessage = 'Täida kõik väljad'
        this.stopSpinner()
      }
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

    allFormFieldsAreCorrect() {
      return this.username && this.password
    },

    async handleLoginResponse(response) {
      this.loginResponse = response.data
      await new Promise((resolve) => setTimeout(resolve, 4000))
      localStorage.setItem('userId', this.loginResponse.userId)
      localStorage.setItem('roleName', this.loginResponse.roleName)
      // todo: menüüs log out kuvamine
      // todo: navigeeri atms lehele
    },

    handleLoginError(error) {
      const statusNumber = error.response.status
      this.errorResponse = error.response.data

      if (statusNumber === 403 && this.errorResponse.errorCode === 111) {
        this.errorMessage = this.errorResponse.message
      } else {
        // todo: navigeeri uups midagi läks valest
      }
    },

    startSpinner() {
      this.showSpinner = true
    },

    stopSpinner() {
      this.showSpinner = false
    },
  },
}
</script>
