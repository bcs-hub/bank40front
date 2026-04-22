<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <select class="form-select" aria-label="Default select example">
          <option selected>-- Kõik Linnad --</option>
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
import cityService from '@/api-services/CityService.js'

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
      cityService.sendGetCitiesRequest()
    },
  },
  beforeMount() {
    // alert('userId: '+this.userId+' roleName:'+this.roleName)
    this.getCities()
  },
}
</script>
