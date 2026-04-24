<template>
  <div class="mb-3">
    <input ref="fileInput" class="form-control" type="file" @change="handleImage" accept="image/x-png,image/jpeg,image/gif">
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  props: {
    resetFileInput: Boolean
  },
  watch: {
    resetFileInput(newValue) {
      if (newValue) {
        this.clearFileInput()
      }
    },
  },
  methods: {
    handleImage(event) {
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    emitBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        let imageDataBase64 = reader.result;
        this.$emit('event-new-image-selected', imageDataBase64)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    },

    clearFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
        this.$emit('event-reset-image-select-complete')
      }
    },

  }
}
</script>