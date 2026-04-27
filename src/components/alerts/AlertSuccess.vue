<template>
  <div
    v-if="successMessage"
    class="alert alert-success alert-dismissible"
    role="alert"
    style="white-space: pre-line"
  >
    {{ successMessage }}
    <button type="button" class="btn-close" aria-label="Close" @click="$emit('event-click-close')"></button>
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
