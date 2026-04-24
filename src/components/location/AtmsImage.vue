<script>
export default {
  name: 'AtmsImage',
  props: {
    imageData: String,
  },
}
</script>

<template>
  <div>
    <img
      v-if="imageData === ''"
      src="../../assets/images/atm.png"
      class="img-thumbnail"
      alt="Pangaautmaadi pilt"
    />
    <img v-else :src="imageData" class="img-thumbnail" alt="Pangaautmaadi pilt" />
  </div>
</template>
