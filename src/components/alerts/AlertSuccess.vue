<template>
  <div v-if="successMessage" class="alert alert-success" role="alert" style="white-space: pre-line">
    {{ successMessage }}
  </div>
</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    successMessage: String,
  },
}
</script>
