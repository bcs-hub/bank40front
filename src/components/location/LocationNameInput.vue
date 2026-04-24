<script>
export default {
  name: 'LocationNameInput',
  props: {
    locationName:String,
  }
}
</script>

<template>
  <div class="form-floating mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Asukoht"
      id="inputLocationName"
      :value="locationName"
    ></input>
    <label for="inputLocationName">Asukoht</label>
  </div>
</template>
