<template>
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
</template>

<script>
export default {
  name: 'LocationForm',
  props: {
    location: {},
  },
}
</script>
