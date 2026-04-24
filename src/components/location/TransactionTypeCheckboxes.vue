<script>
export default {
  name: 'TransactionTypeCheckboxes',
  props: {
    transactionTypes: [],
  },
  emits: ['event-transaction-type-chackbox-toggled'],
}
</script>

<template>
  <h5>Saadavad toimingu tüübid</h5>
  <div class="mb-3">
    <div
      v-for="transactionType in transactionTypes"
      :key="transactionType.transactionTypeId"
      class="form-check"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :checked="transactionType.isAvailable"
        @input="$emit('event-transaction-type-chackbox-toggled', transactionType.transactionTypeId)"
        value=""
        :id="'transactionTypeId-' + transactionType.transactionTypeId"
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
