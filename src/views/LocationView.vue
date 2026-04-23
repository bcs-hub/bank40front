<template>
  <div class="container text-center">
    <div class="row mb-3">
      <div class="col">
        <h1>Lisa asukoht</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          first-option-label="Vali linn"
          :first-option-is-disabled="true"
        />
      </div>
      <div class="col">
        <h4>vorm</h4>
      </div>
      <div class="col">
        <h4>pilt</h4>
      </div>
    </div>
  </div>
</template>

<script>
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'

export default {
  name: 'LocationView',
  components: { CitiesDropdown },
  data() {
    return {
      selectedCityId: 0,

      cities: [
        {
          cityId: 0,
          cityName: '',
        },
      ],
    }
  },
  methods: {
    getCities() {
      CityService.sendGetCitiesRequest()
        .then((response) => this.handleGetCitiesResponse(response))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()
    },

    handleGetCitiesResponse(response) {
      this.cities = response.data
    },
  },
  beforeMount() {
    this.getCities()
  },
}
</script>
