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

        <button @click="login" type="submit" class="btn btn-outline-secondary">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertError from '@/components/AlertError.vue'
import axios from 'axios'

export default {
  name: 'LoginView',
  components: { AlertError },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loginResponse: {
        userId: 0,
        roleName: '',
      },
    }
  },
  methods: {
    login() {
      this.resetErrorMessage()
      if (this.allFormFieldsAreCorrect()) {
        axios
          .get('/api/login', {
            params: {
              username: 'AAA',
              password: 'BBB',
            },
          })
          .then((response) => {
            this.loginResponse = response.data
            localStorage.setItem('userId', this.loginResponse.userId)
            localStorage.setItem('roleName', this.loginResponse.roleName)
          })
          .catch()
      } else {
        this.errorMessage = 'Täida kõik väljad'
      }
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

    allFormFieldsAreCorrect() {
      return this.username && this.password
    },
  },
}
</script>
