<script>
export default {
  name: 'AumberOfAtmsInput',
  props: {
    numberOfAtms: Number
  }
}
</script>

<template>
  <div class="form-floating mb-3">
    <input
      type="number"
      min="1"
      class="form-control"
      placeholder="Automaatide arv"
      id="numberOfAtms"
      :value="numberOfAtms"
    ></input>
    <label for="numberOfAtms">Automaatide arv</label>
  </div>
</template>
