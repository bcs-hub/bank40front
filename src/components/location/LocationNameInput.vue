<script>
export default {
  name: 'LocationNameInput',
  props: {
    locationName:String,
  },
  emits:['event-location-name-updated']
}
</script>

<template>
  <div class="form-floating mb-3">
    <input @input="$emit('event-location-name-updated',$event.target.value)"
      type="text"
      class="form-control"
      placeholder="Asukoht"
      id="inputLocationName"
      :value="locationName"
    ></input>
    <label for="inputLocationName">Asukoht</label>
  </div>
</template>
