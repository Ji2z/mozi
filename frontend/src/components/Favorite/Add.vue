<template>
  <div>
    <Camera ref="camera" />
  </div>
</template>

<script>
import Camera from "../Camera.vue";

export default {
  name: "FavoriteScan",
  components: {
    Camera,
  },
  data() {
    return {};
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.camera.stopCameraStream();
    next();
  },
};
</script>
