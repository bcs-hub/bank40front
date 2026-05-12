<template>
  <BaseModal :isOpen="isOpen" @event-modal-closed="$emit('event-modal-closed')">
    <template #title>{{ location.locationName }}</template>
    <template #body>
      <div class="d-flex gap-3">
        <div>
          <p><strong>Automaatide arv:</strong> {{ location.numberOfAtms }}</p>
          <div
            v-for="transactionType in location.transactionTypes"
            :key="transactionType.transactionTypeName"
          >
            {{ transactionType.transactionTypeName }}
          </div>
        </div>
        <AtmImage :imageData="location.imageData" />
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue'
import AtmImage from '@/components/AtmImage.vue'

export default {
  name: 'LocationInfoModal',
  components: { BaseModal, AtmImage },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    location: Object,
  },
  emits: ['event-modal-closed'],
}
</script>
