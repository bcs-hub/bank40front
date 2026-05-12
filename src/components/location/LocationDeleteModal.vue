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
            <div v-if="transactionType.isAvailable">
              {{ transactionType.transactionTypeName }}
            </div>
          </div>
        </div>
        <AtmImage :imageData="location.imageData" style="height: 200px" />
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn btn-secondary me-2" @click="$emit('event-modal-closed')">Sulge</button>
      <button type="button" class="btn btn-danger" @click="$emit('event-location-deleted')">Kustuta</button>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue'
import AtmImage from '@/components/AtmImage.vue'

export default {
  name: 'LocationDeleteModal',
  components: { BaseModal, AtmImage },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    location: Object,
  },
  emits: ['event-modal-closed', 'event-location-deleted'],
}
</script>
