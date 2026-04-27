<template>
  <div
    v-if="errorMessage"
    class="alert alert-danger alert-dismissible"
    role="alert"
    style="white-space: pre-line"
  >
    {{ errorMessage }}
    <button type="button" class="btn-close"  aria-label="Close" @click="$emit('event-click-close')"></button>
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
