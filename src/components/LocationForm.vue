<script>
export default {
  name: 'LocationForm',
  props: {
    location: {}
  }
}
</script>

<template>
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
      <div v-for="transactionType in location.transactionTypes" :key="transactionType.transactionTypeId"
           class="form-check">
        <input class="form-check-input" type="checkbox" :checked="transactionType.isAvailable" value=""
               :id="'transactionTypeId-'+transactionType.transactionTypeId">
        <label class="form-check-label" :for="'transactionTypeId-'+transactionType.transactionTypeId">
          {{transactionType.transactionTypeName}}
        </label>
      </div>
    </div>
  </div>
</template>