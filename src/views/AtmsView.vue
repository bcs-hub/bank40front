<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">

        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row">
      <div class="col col-3">
        <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          @event-new-city-selected="setSelectedCityId"
        />
      </div>
      <div class="col">
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Linn</th>
              <th scope="col">Asukoht</th>
              <th scope="col">Teenused</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tallinn</td>
              <td>Sikupilli Prisma</td>
              <td>
                <div>Sularaha sisse</div>
                <div>Sularaha välja</div>
                <div>Maksed</div>
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

export default {
  name: 'AtmsView',
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

      locations: [
        {
          locationId: 0,
          locationName: '',
          cityName: '',
          transactionTypes: [
            {
              transactionTypeName: '',
            }
          ],
        }
      ],

      errorResponse: {
        message: '',
        errorCode: 0,
      },
    }
  },
  methods: {
    getLocations() {
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
        // then

      }


    },

    setSelectedCityId(selectedCityId) {
      this.selectedCityId = selectedCityId
      alert('cityId' + this.selectedCityId)
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
