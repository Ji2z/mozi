<template>
  <div>
    <Camera ref="camera" path="search" />
  </div>
</template>

<script>
import Camera from "../../components/Camera.vue";

export default {
  name: "SearchScan",
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
