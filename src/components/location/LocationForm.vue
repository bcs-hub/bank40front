<template>
  <div class="mb-3">
    <LocationNameInput :location-name="location.locationName" />
    <NumberOfAtmsInput :number-of-atms="location.numberOfAtms" />
    <TransactionTypesCheckbox :transaction-types="location.transactionTypes" />
  </div>
</template>

<script>
import LocationNameInput from '@/components/location/LocationNameInput.vue'
import NumberOfAtmsInput from '@/components/location/NumberOfAtmsInput.vue'
import TransactionTypesCheckbox from '@/components/location/TransactionTypesCheckbox.vue'

export default {
  name: 'LocationForm',
  components: { TransactionTypesCheckbox, NumberOfAtmsInput, LocationNameInput },
  props: {
    location: {},
  },
}
</script>
