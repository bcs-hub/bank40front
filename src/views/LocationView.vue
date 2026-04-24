<template>
  <div class="container text-center">
    <div class="row mb-3">
      <div class="col">
        <h1>Lisa asukoht</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          first-option-label="Vali linn"
          :first-option-is-disabled="true"
        />
      </div>
      <div class="col col-2">
        <div class="mb-3">
          <div class="form-floating mb-3">
            <input
              :value="location.locationName"
              type="text"
              class="form-control"
              id="inputLocationName"
              placeholder="Asukoht"
            />
            <label for="inputLocationName">Asukoht</label>
          </div>
          <div class="form-floating mb-3">
            <input
              :value="location.numberOfAtms"
              type="number"
              min="1"
              class="form-control"
              id="inputNumberOfAtms"
              placeholder="Automaatide arv"
            />
            <label for="inputNumberOfAtms">Automaatide arv</label>
          </div>
          <div
            v-for="transactionType in location.transactionTypes"
            :key="transactionType.transactionTypeId"
            class="form-check"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :id="'transactionTypeId-' + transactionType.transactionTypeId"
              :checked="transactionType.isAvailable"
            />
            <label
              class="form-check-label"
              :for="'transactionTypeId-' + transactionType.transactionTypeId"
            >
              {{ transactionType.transactionTypeName }}
            </label>
          </div>
        </div>
      </div>
      <div class="col col-2">
        <img
          v-if="imageData === ''"
          src="@/assets/images/atm.png"
          class="img-thumbnail"
          alt="Pangaautomaadi pilt"
        />
        <img v-else :src="imageData" class="img-thumbnail" alt="Pangaautomaadi pilt" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-3">
        <ImageInput @event-new-image-selected="imageData = $event" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-4">
        <button type="submit" class="btn btn-outline-secondary me-3">Tagasi</button>
        <button type="submit" class="btn btn-outline-success">Lisa</button>
      </div>
    </div>
  </div>
</template>

<script>
import CitiesDropdown from '@/components/CitiesDropdown.vue'
import CityService from '@/api-services/CityService.js'
import NavigationService from '@/navigation/NavigationService.js'
import ImageInput from '@/components/ImageInput.vue'

export default {
  name: 'LocationView',
  components: { ImageInput, CitiesDropdown },
  data() {
    return {
      imageData: '',
      selectedCityId: 0,

      location: {
        cityId: 0,
        locationName: 'AAAAAAA',
        numberOfAtms: 1,
        imageData: '',
        transactionTypes: [
          {
            transactionTypeId: 1,
            transactionTypeName: 'AAAA',
            isAvailable: true,
          },
          {
            transactionTypeId: 2,
            transactionTypeName: 'BBB',
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
