<template>
  <select class="form-select" aria-label="Default select example">
    <option selected>-- Kõik Linnad --</option>
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
  },
}
</script>
