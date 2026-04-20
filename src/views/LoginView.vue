<template>
  <div class="container text-center">
    <div class="row justify-content-center">

      <div class="col col-6">
        <div class="alert alert-danger" role="alert"> {{ errorMessage }} </div>
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
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    login() {
      if (this.allFormFieldsAreCorrect()) {
        // saadame backile (stoplight) sõnumi
      } else {
        this.errorMessage = 'Täida kõik väljad'
      }
    },

    allFormFieldsAreCorrect() {
      return this.username !== '' && this.password !== ''
    },
  },
}
</script>
