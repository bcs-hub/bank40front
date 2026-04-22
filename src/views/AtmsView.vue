<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1 ref="MingiNimiRef">Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row">
      <div class="col col-3">
        <CitiesDropDown
          :cities="cities"
          :selected-city-id="selectedCityID"
          @event-new-city-selected="setSelectedCityId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/auth/AuthService.js'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import CitiesDropDown from '@/components/CitiesDropDown.vue'

export default {
  name: 'AtmsView',
  components: { CitiesDropDown },
  data() {
    return {
      userId: AuthService.getLoggedInUserId(),
      roleName: AuthService.getLoggedInUserRoleName(),
      selectedCityID: 0,
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
    setSelectedCityId(selectedCityId) {
      this.selectedCityID = selectedCityId
    },
  },
  beforeMount() {
    this.getCities()
  },

  //alert('userId: ' + this.userId + ' roleName: ' + this.roleName)
}
</script>
