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
          :selected-city-id="location.cityId"
          first-option-label="Vali linn"
          :first-option-is-disabled="true"
          @event-new-city-selected="location.cityId = $event"
        />
      </div>
      <div class="col col-2">
        <LocationForm :location="location" />
      </div>
      <div class="col col-2">
        <img
          v-if="location.imageData === ''"
          src="@/assets/images/atm.png"
          class="img-thumbnail"
          alt="Pangaautomaadi pilt"
        />
        <img v-else :src="location.imageData" class="img-thumbnail" alt="Pangaautomaadi pilt" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-3">
        <ImageInput @event-new-image-selected="location.imageData = $event" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-4">
        <button type="submit" class="btn btn-outline-secondary me-3">Tagasi</button>
        <button type="submit" class="btn btn-outline-success">Lisa</button>
      </div>
    </div>
  </div>
</template>

<script>
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import ImageInput from '@/components/ImageInput.vue'
import LocationForm from '@/components/location/LocationForm.vue'
import TransactionTypeService from '@/api-services/TransactionTypeService.js'

export default {
  name: 'LocationView',
  components: { LocationForm, ImageInput, CitiesDropdown },
  data() {
    return {
      location: {
        cityId: 0,
        locationName: '',
        numberOfAtms: 1,
        imageData: '',
        transactionTypes: [
          {
            transactionTypeId: 0,
            transactionTypeName: '',
            isAvailable: false,
          },
        ],
      },

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
        .then((response) => (this.cities = response.data))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()
    },

    getLocationTransactionTypes() {
      TransactionTypeService.sendGetTransactionTypesRequest()
        .then((response) => (this.location.transactionTypes = response.data))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()
    },
  },
  beforeMount() {
    this.getCities()
    this.getLocationTransactionTypes()
  },
}
</script>
