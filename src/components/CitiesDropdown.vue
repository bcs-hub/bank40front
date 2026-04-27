<template>
  <select
    @change="$emit('event-selected-city-changed',Number($event.target.value))"
    :value="selectedCityId"
    class="form-select"
    aria-label="Default select example"
  >
    <option selected :disabled="firstOptionIsDisabled" :value="0">{{ firstOptionLabel }}</option>
    <option v-for="city in cities" :key="city.cityId" :value="city.cityId">
      {{ city.cityName }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'CitiesDropdown',
  props: {
    cities: [{}],
    selectedCityId: Number,
    firstOptionLabel: { type: String, default: '-- Kõik linnad --' },
    firstOptionIsDisabled:{type: Boolean, default: false },
  },
  methods: {},
  emits:
    ['event-selected-city-changed'],
}
</script>
