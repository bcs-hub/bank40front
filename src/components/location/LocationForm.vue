<script>
import LocationNameInput from '@/components/location/LocationNameInput.vue'
import AumberOfAtmsInput from '@/components/location/AumberOfAtmsInput.vue'
import TransactionTypeCheckboxes from '@/components/location/TransactionTypeCheckboxes.vue'

export default {
  name: 'LocationForm',
  components: { TransactionTypeCheckboxes, AumberOfAtmsInput, LocationNameInput },
  props: {
    location: {},
  },
}
</script>

<template>
  <div>
    <LocationNameInput :location-name="location.locationName" />
    <AumberOfAtmsInput :number-of-atms="location.numberOfAtms" />
    <TransactionTypeCheckboxes :transaction-types="location.transactionTypes" />
  </div>
</template>
