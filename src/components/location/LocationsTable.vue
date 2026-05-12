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
      </tr>
    </tbody>
  </table>
</template>

<script>
import LocationInfoModal from '@/components/location/LocationInfoModal.vue'
import LocationService from '@/api-services/LocationService.js'
import NavigationService from '@/navigation/NavigationService.js'

export default {
  name: 'LocationsTable',
  components: { LocationInfoModal },
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
  },
}
</script>
