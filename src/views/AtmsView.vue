<template>
  <div class="container text-center">
    <div class="row mb-3">
      <div class="col">
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row">
      <div class="col col-3">
        <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          @event-new-city-selected="getSelectedCityLocations"
        />
      </div>
      <div class="col">
        <AlertError :error-message="errorMessage" />
        <LocationsTable :locations="locations" />
      </div>
    </div>
  </div>
</template>

<script>
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import LocationService from '@/api-services/LocationService.js'
import AlertError from '@/components/AlertError.vue'
import LocationsTable from '@/components/location/LocationsTable.vue'

export default {
  name: 'AtmsView',
  components: { LocationsTable: LocationsTable, AlertError, CitiesDropdown },
  data() {
    return {
      errorMessage: '',
      selectedCityId: 0,

      cities: [
        {
          cityId: 0,
          cityName: '',
        },
      ],

      locations: [
        {
          locationId: 0,
          locationName: '',
          cityName: '',
          transactionTypes: [
            {
              transactionTypeName: '',
            },
          ],
        },
      ],

      errorResponse: {
        message: '',
        errorCode: 0,
      },
    }
  },
  methods: {
    getLocations() {
      this.errorMessage = ''
      LocationService.sendGetAtmLocations(this.selectedCityId)
        .then((response) => this.handleGetLocationsResponse(response.data))
        .catch((error) => this.handleGetLocationsError(error))
        .finally()
    },

    handleGetLocationsResponse(locations) {
      this.locations = locations
    },

    handleGetLocationsError(error) {
      this.errorResponse = error.response.data
      let statusCode = error.response.status

      // Kui saadakse http status 404 ja errorCode on 222, siis kuvada sõnumist saadud message sisu
      if (statusCode === 404 && this.errorResponse.errorCode === 222) {
        this.errorMessage = this.errorResponse.message
        this.locations = []
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    getSelectedCityLocations(selectedCityId) {
      this.selectedCityId = selectedCityId
      this.getLocations()
    },

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
    this.getLocations()
  },
}
</script>
