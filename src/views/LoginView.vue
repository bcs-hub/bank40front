<template>
  <div class="container text-center">
    <div class="row">
      <div class="col col-3">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <button @click="helloWorld" type="submit" class="btn btn-outline-secondary">Login</button>
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
