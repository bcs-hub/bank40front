<template>
  <LocationInfoModal
    :isOpen="isInfoModalOpen"
    :location="selectedLocation"
    @event-modal-closed="isInfoModalOpen = false"
  />

  <LocationDeleteModal
    :isOpen="isDeleteModalOpen"
    :location="selectedLocation"
    @event-modal-closed="isDeleteModalOpen = false"
    @event-location-deleted="deleteLocation"
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
          <a href="#" @click.prevent="openInfoModal(location.locationId)">
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
          <PhX :size="16" class="ms-2" style="cursor: pointer" @click="openDeleteModal(location.locationId)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import LocationInfoModal from '@/components/location/LocationInfoModal.vue'
import LocationDeleteModal from '@/components/location/LocationDeleteModal.vue'
import LocationService from '@/api-services/LocationService.js'
import NavigationService from '@/navigation/NavigationService.js'
import AuthService from '@/auth/AuthService.js'
import { PhPencilSimpleLine, PhX } from '@phosphor-icons/vue'

export default {
  name: 'LocationsTable',
  components: { LocationInfoModal, LocationDeleteModal, PhPencilSimpleLine, PhX },
  props: {
    locations: {},
  },
  emits: ['event-location-deleted'],
  data() {
    return {
      isInfoModalOpen: false,
      isDeleteModalOpen: false,
      selectedLocation: {
        locationName: '',
        numberOfAtms: null,
        imageData: '',
        transactionTypes: [],
      },
      selectedLocationId: null,
    }
  },
  computed: {
    isAdmin() {
      return AuthService.isLoggedIn() && AuthService.getLoggedInUserRoleName() === 'admin'
    },
  },
  methods: {
    openInfoModal(locationId) {
      LocationService.sendGetAtmLocation(locationId)
        .then((response) => this.handleGetLocationResponse(response.data))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()

      this.selectedLocationId = locationId
      this.isInfoModalOpen = true
    },

    openDeleteModal(locationId) {
      LocationService.sendGetAtmLocation(locationId)
        .then((response) => this.handleGetLocationResponse(response.data))
        .catch(() => NavigationService.navigateToErrorView())
        .finally()

      this.selectedLocationId = locationId
      this.isDeleteModalOpen = true
    },

    handleGetLocationResponse(data) {
      this.selectedLocation = data
    },

    navigateToEdit(locationId) {
      NavigationService.navigateToLocationView(locationId)
    },

    deleteLocation() {
      LocationService.sendDeleteAtmLocation(this.selectedLocationId)
        .then(() => this.handleDeleteLocationResponse())
        .catch(() => NavigationService.navigateToErrorView())
        .finally()
    },

    handleDeleteLocationResponse() {
      this.isDeleteModalOpen = false
      this.$emit('event-location-deleted', this.selectedLocationId)
    },
  },
}
</script>
