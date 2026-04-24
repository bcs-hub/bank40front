<script>
export default {
  name: 'NumberOfAtmsInput',
  props: {
    numberOfAtms: Number
  },
  emits:['event-number-of-atms-updated']
}
</script>

<template>
  <div class="form-floating mb-3">
    <input
      @input="$emit('event-number-of-atms-updated',Number($event.target.value))"
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
