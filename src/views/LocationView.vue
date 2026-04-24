<script>
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import ImageInput from '@/components/location/ImageInput.vue'
import LocationForm from '@/components/location/LocationForm.vue'
import TransactionTypeService from '@/api-services/TransactionTypeService.js'

export default {
  name: 'LocationView',
  components: { LocationForm, ImageInput, CitiesDropdown },
  data() {
    return {
      cities: [
        {
          cityId: 0,
          cityName: '',
        },
      ],
      location: {
        cityId: 0,
        locationName: '',
        numberOfAtms: 1,
        imageData: '',
        transactionTypes: [
          {
            transactionTypeId: 0,
            transactionTypeName: 'Kala',
            isAvailable: false,
          },
        ],
      },
    }
  },
  methods: {
    getCities() {
      CityService.sendGetCitiesRequest()
        .then((response) => this.handleGetCitiesResponse(response))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()
    },
    getLocationTransactionTypes() {
      TransactionTypeService.sendGetTransactionTypesRequest()
        .then((response) => (this.location.transactionTypes = response.data))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()
    },

    handleGetCitiesResponse(response) {
      this.cities = response.data
    },
  },
  beforeMount() {
    this.getCities()
    this.getLocationTransactionTypes()
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
          :selected-city-id="location.cityId"
          :first-option-label="'Vali Linn'"
          :first-option-is-disabled="true"
        />
      </div>
      <div class="col-4">
        <LocationForm :location="location" />
      </div>
      <div class="col">
        <div>
          <img
            v-if="location.imageData === ''"
            src="@/assets/images/atm.png"
            class="img-thumbnail"
            alt="Pangaautmaadi pilt"
          />
          <img v-else :src="location.imageData" class="img-thumbnail" alt="Pangaautmaadi pilt" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3">
        <ImageInput @event-new-image-selected="imageData = $event" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <button type="button" class="btn btn-outline-secondary me-3">Tagasi</button>
        <button type="button" class="btn btn-outline-success">Lisa</button>
      </div>
    </div>
  </div>
</template>
