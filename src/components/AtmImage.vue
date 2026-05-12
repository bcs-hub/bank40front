<template>
  <img
    v-if="imageData === ''"
    src="../assets/images/atm.png"
    class="img-thumbnail"
    alt="Pangaautomaadi pilt"
  /><img v-else :src="imageData" class="img-thumbnail" alt="Pangaautomaadi pilt" />
</template>

<script>
export default {
  name: 'AtmImage',
  props: {
    imageData: String,
  },
}
</script>
