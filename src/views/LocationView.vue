<template>
  <div class="container text-center">
    <div class="row mb-3">
      <div class="col">
        <h1>Lisa asukoht</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          first-option-label="Vali linn"
          :first-option-is-disabled="true"
        />
      </div>
      <div class="col col-2">
        <div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="inputLocationName" placeholder="Asukoht" />
            <label for="inputLocationName">Asukoht</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="number"
              min="1"
              class="form-control"
              id="inputNumberOfAtms"
              placeholder="Automaatide arv"
            />
            <label for="inputNumberOfAtms">Automaatide arv</label>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="transactionTypeId-1" />
            <label class="form-check-label" for="checkDefault"> Sularaha sisse </label>
          </div>
        </div>
      </div>
      <div class="col">
        <h4>pilt</h4>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-3">
        <ImageInput @event-new-image-selected="imageData = $event" />
        <img :src="imageData" alt="" />
      </div>
    </div>
  </div>
</template>

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
      imageData: '',
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
