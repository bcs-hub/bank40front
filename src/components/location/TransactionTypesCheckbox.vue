<template>
  <div
    v-for="transactionType in transactionTypes"
    :key="transactionType.transactionTypeId"
    class="form-check"
  >
    <input
      class="form-check-input"
      type="checkbox"
      :id="'transactionTypeId-' + transactionType.transactionTypeId"
      :checked="transactionType.isAvailable"
    />
    <label class="form-check-label" :for="'transactionTypeId-' + transactionType.transactionTypeId">
      {{ transactionType.transactionTypeName }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'TransactionTypesCheckbox',
  props: {
    transactionTypes: Array,
  },
}
</script>
