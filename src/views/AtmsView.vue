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
          :celected-city-id="selectedCityId"
          @event-new-city-slected="setSelectedCityId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/auth/AuthService.js'
import CityService from '@/api-services/CityService.js'
import navigationService from '@/navigation/NavigationService.js'
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
    setSelectedCityId(selectedCityId){
      this.selectedCityId = selectedCityId
    },

    getCities() {
      CityService.sendGetCitiesRequest()
        .then((response) => this.handleGetCitiesResponse(response))
        .catch(() => navigationService.navigateToErrorView())
        .finally()
    },
    handleGetCitiesResponse(response) {
      this.cities = response.data
    },
  },

  beforeMount() {
    //  alert('userId: ' + this.userId + ' roleName: ' + this.roleName)
    this.getCities()
  },
}
</script>
