<script>
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
export default {
  name: 'LocationView',
  components: { CitiesDropdown },
  data() {
    return {
      cities: [
        {
          cityId: 0,
          cityName: '',
        },
      ],
      selectedCityId: 0,
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

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h2>Lisa asukoht</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CitiesDropdown :cities="cities" :selected-city-id="selectedCityId" :first-option-label="'Vali Linn'" :first-option-is-disabled="true"/>
      </div>
      <div class="col">
        <h2>Vorm</h2>
      </div>
      <div class="col">
        <h2>Pilt</h2>
      </div>
    </div>
  </div>
</template>
