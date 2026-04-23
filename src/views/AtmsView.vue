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

export default {
  name: 'AtmsView',
  components: { CitiesDropdown },
  data() {
    return {
      userId: AuthService.getLoggedInUserId(),
      roleName: AuthService.getLoggedInUserRoleName(),

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

    setSelectedCityId(selectedCityId) {
      this.selectedCityId = selectedCityId
      alert("cityId" + this.selectedCityId)
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
  },
}
</script>
