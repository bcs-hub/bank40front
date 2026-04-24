<template>
  <div class="form-floating mb-3">
    <input
      :value="numberOfAtms"
      type="number"
      min="1"
      class="form-control"
      id="inputNumberOfAtms"
      placeholder="Automaatide arv"
    />
    <label for="inputNumberOfAtms">Automaatide arv</label>
  </div>
</template>

<script>
export default {
  name: 'NumberOfAtmsInput',
  props: {
    numberOfAtms: Number,
  },
}
</script>
