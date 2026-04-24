<script>
export default {
  name: 'TransactionTypeCheckboxes',
  props: {
    transactionTypes: [],
  },
}
</script>

<template>
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
