<script>
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import ImageInput from '@/components/location/ImageInput.vue'
import LocationForm from '@/components/location/LocationForm.vue'
import TransactionTypeService from '@/api-services/TransactionTypeService.js'
import AtmsImage from '@/components/location/AtmsImage.vue'
import AlertError from '@/components/alerts/AlertError.vue'
import LocationService from '@/api-services/LocationService.js'
import AlertSuccess from '@/components/alerts/AlertSuccess.vue'

export default {
  name: 'LocationView',
  components: { AlertSuccess, AlertError, AtmsImage, LocationForm, ImageInput, CitiesDropdown },
  data() {
    return {
      errorMessage: '',
      successMessage: '',

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
            transactionTypeName: '',
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
    addLocation() {
      this.resetAllMessages()
      let errorMessages = this.validateFormCorrectInput()
      this.errorMessage = errorMessages.toString().replaceAll(',', '; \n')
      if (this.errorMessage === '') {
        LocationService.sendPostAtmLocation(this.location)
          .then(() => {
            this.handleAddLocationResponse()
          })
          .catch()
          .finally()
      }
    },
    handleAddLocationResponse() {
      this.successMessage= 'Pangaautommadi asukoht "'+this.location.locationName+'" on süsteemi lisatud.'
      this.clearLocationForm()
    },
    clearLocationForm() {
      this.location={
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
      }
    },
    validateFormCorrectInput() {
      let errorMessages = []
      if (this.location.cityId === 0) {
        errorMessages.push('Vali mõni linn')
      }
      if (this.location.locationName === '') {
        errorMessages.push('Pane asukohale nimi')
      }
      if (this.location.numberOfAtms < 1) {
        errorMessages.push('Peab olema vähemalt üks pangaautomaat')
      }

      if (!this.atLeastOneTransactionTypeIsSelected()) {
        errorMessages.push('Vali vähemalt üks toimingu tüüp')
      }
      return errorMessages
    },
    atLeastOneTransactionTypeIsSelected() {
      for (let transactionType of this.location.transactionTypes) {
        if (transactionType.isAvailable) {
          return true
        }
      }
      return false
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
    handleTransactionTypeCheckboxToggle(transactionTypeId) {
      this.location.transactionTypes = this.location.transactionTypes.map((t) =>
        t.transactionTypeId === transactionTypeId ? { ...t, isAvailable: !t.isAvailable } : t,
      )
    },
    resetAllMessages(){
      this.successMessage=''
      this.errorMessage=''
    }
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
        <AlertError :error-message="errorMessage" />
        <AlertSuccess :success-message="successMessage" />
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
          @event-selected-city-changed="location.cityId = $event"
        />
      </div>
      <div class="col-4">
        <LocationForm
          :location="location"
          @event-location-name-updated="location.locationName = $event"
          @event-number-of-atms-updated="location.numberOfAtms = $event"
          @event-transaction-type-chackbox-toggled="handleTransactionTypeCheckboxToggle"
        />
      </div>
      <div class="col">
        <AtmsImage :image-data="location.imageData" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3">
        <ImageInput @event-new-image-selected="location.imageData = $event" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <button type="button" class="btn btn-outline-secondary me-3">Tagasi</button>
        <button @click="addLocation()" type="button" class="btn btn-outline-success">Lisa</button>
      </div>
    </div>
  </div>
</template>
