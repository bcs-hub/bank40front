<template>
  <select
    @change="$emit('event-new-city-selected', Number($event.target.value))"
    :value="selectedCityId"
    class="form-select"
    aria-label="Vali linn"
  >
    <option selected :value="0">-- Kõik linnad --</option>
    <option v-for="city in cities" :key="city.cityId" :value="city.cityId">
      {{ city.cityName }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'CitiesDropdown',
  props: {
    cities: Object,
    selectedCityId: Number,
  },

}
</script>
