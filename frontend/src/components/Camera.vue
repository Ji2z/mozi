<template>
  <div class="video-container">
    <video autoplay ref="camera" />
  </div>
</template>

<script>
export default {
  name: "Camera",
  data() {
    return {};
  },
  methods: {
    init() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          // let videoPlayer = document.querySelector("video");
          const videoPlayer = this.$refs.camera;
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("Cannot get Media Devices");
      }
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>

<style lang="scss">
.video-container 
{
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.video-container video 
{
  min-width: 100%;
  min-height: 100%;
}
</style>
