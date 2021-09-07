<template>
  <div>
    <Camera ref="camera" />
  </div>
</template>

<script>
import Camera from "../components/Camera";

export default {
  name: "Scan",
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
