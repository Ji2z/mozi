<template>
  <div>
    <Camera ref="camera" path="favoriteAdd" />
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
    this.$refs.camera.stopCameraStream();
    next();
  },
};
</script>
