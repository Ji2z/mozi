<template>
  <div>
    <Camera ref="camera" path="scan" />
  </div>
</template>

<script>
import Camera from "../components/Camera";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Scan",
  components: {
    Camera,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["storeIsDetect"]),
  },
  computed: {
    ...mapGetters(["getIsDetect"]),
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.camera.stopCameraStream();
    next();
  },
  created() {
    this.storeIsDetect(true);
  },
};
</script>
