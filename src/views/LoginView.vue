<template>
  <div class="container text-center">
    <div class="row">
      <div class="col col-3">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Kasutajanimi</span>
          <input
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Parool</span>
          <input
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <button @click="helloWorld" type="submit" class="btn btn-outline-secondary">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    helloWorld() {
      alert('Tere maailm')
    },
  },
}
</script>
