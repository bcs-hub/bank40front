<template>
  <select
    @change="$emit('event-selected-city-changed',$event.target.value)"
    :value="selectedCityId"
    class="form-select"
    aria-label="Default select example"
  >
    <option selected :value="0">-- Kõik Linnad --</option>
    <option v-for="city in cities" :key="city.cityId" :value="city.cityId">
      {{ city.cityName }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'CitiesDropdown',
  props: {
    cities: {},
    selectedCityId: Number,
  },
  methods: {},
}
</script>
