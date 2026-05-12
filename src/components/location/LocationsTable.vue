<template>
  <LocationInfoModal
    :isOpen="isModalOpen"
    :location="location"
    @event-modal-closed="isModalOpen = false"
  />

  <table v-if="locations.length > 0" class="table table-dark table-hover">
    <thead>
      <tr>
        <th scope="col">Linn</th>
        <th scope="col">Asukoht</th>
        <th scope="col">Teenused</th>
        <th v-if="isAdmin" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="location in locations" :key="location.locationId">
        <td>{{ location.cityName }}</td>
        <td>
          <a href="#" @click.prevent="openLocationInfoModal(location.locationId)">
            {{ location.locationName }}
          </a>
        </td>
        <td>
          <div
            v-for="transactionType in location.transactionTypes"
            :key="transactionType.transactionTypeName"
          >
            {{ transactionType.transactionTypeName }}
          </div>
        </td>
        <td v-if="isAdmin">
          <PhPencilSimpleLine :size="16" style="cursor: pointer" @click="navigateToEdit(location.locationId)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import LocationInfoModal from '@/components/location/LocationInfoModal.vue'
import LocationService from '@/api-services/LocationService.js'
import NavigationService from '@/navigation/NavigationService.js'
import AuthService from '@/auth/AuthService.js'
import { PhPencilSimpleLine } from '@phosphor-icons/vue'

export default {
  name: 'LocationsTable',
  components: { LocationInfoModal, PhPencilSimpleLine },
  props: {
    locations: {},
  },
  data() {
    return {
      isModalOpen: false,
      selectedLocationId: null,
      location: {
        locationName: '',
        numberOfAtms: null,
        imageData: '',
        transactionTypes: [],
      },
    }
  },
  computed: {
    isAdmin() {
      return AuthService.isLoggedIn() && AuthService.getLoggedInUserRoleName() === 'admin'
    },
  },
  methods: {
    openLocationInfoModal(locationId) {
      LocationService.sendGetAtmLocation(locationId)
        .then((response) => this.handleGetLocationResponse(response.data))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()

      this.selectedLocationId = locationId
      this.isModalOpen = true
    },

    handleGetLocationResponse(data) {
      this.location = data
      this.isModalOpen = true
    },

    navigateToEdit(locationId) {
      //                                          1
      NavigationService.navigateToLocationView(locationId)
    },
  },
}
</script>
