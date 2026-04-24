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
      cities: [
        {
          cityId: 0,
          cityName: '',
        },
      ],
      selectedCityId: 0,
      imageData:'',
      location:{
        cityId: 0,
        locationName: '',
        numberOfAtms: 1,
        imageData: '',
        transactionTypes: [
          {
            transactionTypeId: 0,
            transactionTypeName: 'Kala',
            isAvailable: false
          }
        ]
      },
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

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h2>Lisa asukoht</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-2">
        <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          :first-option-label="'Vali Linn'"
          :first-option-is-disabled="true"
        />
      </div>
      <div class="col">
        <div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Asukoht"
              id="inputLocationName"
              :value="location.locationName"
            ></input>
            <label for="inputLocationName">Asukoht</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="number"
              min="1"
              class="form-control"
              placeholder="Automaatide arv"
              id="numberOfAtms"
              :value="location.numberOfAtms"
            ></input>
            <label for="numberOfAtms">Automaatide arv</label>
          </div>
          <div class="mb-3">
            <div v-for="transactionType in location.transactionTypes" :key="transactionType.transactionTypeId" class="form-check">
              <input class="form-check-input" type="checkbox" :checked="transactionType.isAvailable" value="" :id="'transactionTypeId-'+transactionType.transactionTypeId">
              <label class="form-check-label" :for="'transactionTypeId-'+transactionType.transactionTypeId">
                {{transactionType.transactionTypeName}}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div>
        <img v-if="imageData===''" src="@/assets/images/atm.png" class="img-thumbnail" alt="Pangaautmaadi pilt">
        <img v-else :src="imageData" class="img-thumbnail" alt="Pangaautmaadi pilt">
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3">
        <ImageInput @event-new-image-selected="imageData = $event" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <button  type="button" class="btn btn-outline-secondary me-3" >Tagasi</button>
        <button type="button" class="btn btn-outline-success" >Lisa</button >
      </div>
    </div>
  </div>
</template>
