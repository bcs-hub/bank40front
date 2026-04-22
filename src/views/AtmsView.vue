<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1 ref="MingiNimiRef">Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row">
      <div class="col col-3">
        <select class="form-select" aria-label="Default select example">
          <option selected>-- Kõik linnad --</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/auth/AuthService.js'
import CityService from '@/api-services/CityService.js'

export default {
  name: 'AtmsView',
  data() {
    return {
      userId: AuthService.getLoggedInUserId(),
      roleName: AuthService.getLoggedInUserRoleName(),
    }
  },
  methods: {
    getCities() {
      CityService.sendGetCitiesRequest()
    },
  },
  beforeMount() {
    this.getCities()
  },
}
</script>
