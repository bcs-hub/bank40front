<template>
  <div class="container text-center">
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <AlertSuccess :success-message="successMessage" />
        <AlertError :error-message="errorMessage" />
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
        <LocationForm
          :location="location"
          @event-location-name-updated="location.locationName = $event"
          @event-number-of-atms-updated="location.numberOfAtms = $event"
          @event-transaction-type-checkbox-toggled="handleTransactionTypeCheckboxToggle"
        />
      </div>
      <div class="col col-2">
        <AtmImage :image-data="location.imageData" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-3">
        <ImageInput
          ref="imageInputRef"
          :reset-file-input="resetImageInput"
          @event-new-image-selected="location.imageData = $event"
          @event-reset-image-select-complete="resetImageInput = false"
        />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-4">
        <button type="submit" class="btn btn-outline-secondary me-3">Tagasi</button>
        <button @click="addLocation" type="submit" class="btn btn-outline-success">Lisa</button>
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
import AtmImage from '@/views/AtmImage.vue'
import AlertError from '@/components/alerts/AlertError.vue'
import LocationService from '@/api-services/LocationService.js'
import AlertSuccess from '@/components/alerts/AlertSuccess.vue'

export default {
  name: 'LocationView',
  components: { AlertSuccess, AlertError, AtmImage, LocationForm, ImageInput, CitiesDropdown },
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      resetImageInput: false,

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
    addLocation() {
      this.resetAllMessages()
      this.validateFormCorrectInput()

      if (this.errorMessage === '') {
        LocationService.sendPostAtmLocation(this.location)
          .then(() => this.handleAddLocationResponse())
          .catch()
          .finally()
      }
    },

    handleAddLocationResponse() {
      this.successMessage =
        'Pangaautomaadi asukoht "' + this.location.locationName + '" on süsteemi lisatud :)'
      this.resetLocationFields()
      // näide ref kasutususest
      // this.$refs.imageInputRef.$refs.fileInput.value = ''
      this.resetImageInput = true
    },

    resetLocationFields() {
      this.location.cityId = 0
      this.location.locationName = ''
      this.location.numberOfAtms = 1
      this.location.imageData = ''
      this.getLocationTransactionTypes()
    },

    validateFormCorrectInput() {
      let errorMessages = []

      if (this.location.cityId === 0) {
        errorMessages.push('Vali mingi linn')
      }

      if (this.location.locationName === '') {
        errorMessages.push('Täida askoha nimi')
      }

      if (this.location.numberOfAtms < 1) {
        errorMessages.push('Vali vähemalt 1 pangaautomaat')
      }

      if (!this.atLeastOneTransactionTypeIsSelected()) {
        errorMessages.push('Vali vähemalt 1 ATM toiming')
      }

      this.errorMessage = errorMessages.join('\n')
    },

    atLeastOneTransactionTypeIsSelected() {
      for (let transactionType of this.location.transactionTypes) {
        if (transactionType.isAvailable) {
          return true
        }
      }
      return false
    },

    handleTransactionTypeCheckboxToggle(transactionTypeId) {
      this.location.transactionTypes = this.location.transactionTypes.map((t) =>
        t.transactionTypeId === transactionTypeId ? { ...t, isAvailable: !t.isAvailable } : t,
      )
    },

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

    resetAllMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },
  },
  beforeMount() {
    this.getCities()
    this.getLocationTransactionTypes()
  },
}
</script>
