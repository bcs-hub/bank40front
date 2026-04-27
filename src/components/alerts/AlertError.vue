<template>
  <div v-if="errorMessage" class="alert alert-danger" role="alert" style="white-space: pre-line">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: 'AlertError',
  props: {
    errorMessage: String,
  },
}
</script>
