<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <CitiesDropdown
          :cities="cities"
          :selectedCityId="selectedCityId"
          @event-selected-city-changed="setSelectedCityId"
        />
      </div>
      <div class="col-6">
        <AlertError :error-message="errorMessage" />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Linn</th>
              <th scope="col">Asukoht</th>
              <th scope="col">Teenused</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tartu</td>
              <td>Tasku</td>
              <td>
                <div>sularaha välja</div>
                <div>sularaha sisse</div>
                <div>maksed</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/auth/AuthService.js'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import LocationService from '@/api-services/LocationService.js'
import AlertError from '@/components/AlertError.vue'

export default {
  name: 'AtmsView',
  components: { CitiesDropdown, AlertError },
  data() {
    return {
      userId: AuthService.getLoggedInUserId(),
      roleName: AuthService.getLoggedInUserRoleName(),
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
      selectedCityId: 0,
      errorResponse: {
        message: '',
        errorCode: 0,
      },
      errorMessage: '',
    }
  },
  methods: {
    getCities() {
      CityService.sendGetCitiesRequest()
        .then((response) => this.handleGetCitiesResponse(response))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()
    },
    getLocations() {
      this.errorMessage=''
      LocationService.sendGetAtmsLocationsRequest(this.selectedCityId)
        .then((response) => this.handleGetAtmsLocationsResponse(response.data))
        .catch((error) => this.handleGetLocationsError(error.response))
        .finally()
    },
    handleGetCitiesResponse(response) {
      this.cities = response.data
    },
    setSelectedCityId(event) {
      this.selectedCityId = Number(event)
      this.getLocations()
    },
    handleGetAtmsLocationsResponse(locations) {
      this.locations = locations
    },

    handleGetLocationsError(error) {
      const statusNumber = error.status
      this.errorResponse = error.data
      if (statusNumber === 404 && this.errorResponse.errorCode === 222) {
        this.errorMessage = this.errorResponse.message
      } else {
      }
    },
  },
  beforeMount() {
    // alert('userId: '+this.userId+' roleName:'+this.roleName)
    this.getCities()
    this.getLocations()
  },
}
</script>
