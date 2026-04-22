<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1 ref="MingiNimiRef">Pangaautomaadid</h1>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/auth/AuthService.js'

export default {
  name: 'AtmsView',
  data() {
    return {
      userId: AuthService.getLoggedInUserId(),
      roleName: AuthService.getLoggedInUserRoleName()
    }
  },
  mounted() {
   alert('userId: ' + this.userId + ' roleName: ' + this.roleName)
  },
}
</script>
