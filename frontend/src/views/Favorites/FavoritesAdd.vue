<template>
  <div>
    <Camera ref="camera" />
  </div>
</template>

<script>
import Camera from "../../components/Camera.vue";

export default {
  name: "FavoriteAdd",
  components: {
    Camera,
  },
  data() {
    return {};
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.video.stopCameraStream();
    //this.$refs.camera.stopCameraStream();
    next();
  },
};
</script>
