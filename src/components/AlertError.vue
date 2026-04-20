<template>
  <div class="alert alert-danger" role="alert">{{ errorMessage }}</div>
</template>

<script>
export default {
  name: 'AlertError',
  props: {
    errorMessage: String,
  },
}
</script>
