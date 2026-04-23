<script>
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import ImageInput from '@/components/ImageInput.vue'

export default {
  name: 'LocationView',
  components: { ImageInput, CitiesDropdown },
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
    <div class="row justify-content-center">
      <div class="col-2">
        <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          :first-option-label="'Vali Linn'"
          :first-option-is-disabled="true"
        />
      </div>
      <div class="col">
        <div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Asukoht"
              id="inputLocationName"
            ></input>
            <label for="inputLocationName">Asukoht</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="number"
              min="1"
              class="form-control"
              placeholder="Automaatide arv"
              id="numberOfAtms"
            ></input>
            <label for="numberOfAtms">Automaatide arv</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="1">
            <label class="form-check-label" for="1">
              Sularaha välja
            </label>
          </div>
        </div>
      </div>
      <div class="col">
        <h2>Pilt</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3">
        <image-input></image-input>
      </div>
    </div>
  </div>
</template>
