<script>
import LocationNameInput from '@/components/location/LocationNameInput.vue'
import NumberOfAtmsInput from '@/components/location/NumberOfAtmsInput.vue'
import TransactionTypeCheckboxes from '@/components/location/TransactionTypeCheckboxes.vue'

export default {
  name: 'LocationForm',
  components: {
    TransactionTypeCheckboxes,
    NumberOfAtmsInput,
    LocationNameInput,
  },
  props: {
    location: {},
  },
  emits: [
    'event-location-name-updated',
    'event-number-of-atms-updated',
    'event-transaction-type-chackbox-toggled',
  ],
}
</script>

<template>
  <div>
    <LocationNameInput
      :location-name="location.locationName"
      @event-location-name-updated="$emit('event-location-name-updated', $event)"
    />
    <NumberOfAtmsInput
      :number-of-atms="location.numberOfAtms"
      @event-number-of-atms-updated="$emit('event-number-of-atms-updated', $event)"
    />
    <TransactionTypeCheckboxes
      :transaction-types="location.transactionTypes"
      @event-transaction-type-chackbox-toggled="$emit('event-transaction-type-chackbox-toggled', $event)"
    />
  </div>
</template>
