<template>
  <div class="video-container">
    <!-- <video autoplay ref="camera" /> -->
    <video ref="camera" autoplay></video>
    <canvas ref="canvas" :width="resultWidth" :height="resultHeight"></canvas>
  </div>
</template>

<script>
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default {
  name: "Camera",
  data() {
    return {
      streamPromise: null,
      modelPromise: null,

      // control the UI visibilities
      isVideoStreamReady: false,
      isModelReady: false,
      initFailMessage: "",

      // tfjs model related
      model: null,
      baseModel: "lite_mobilenet_v2",
      selectableModels: ["lite_mobilenet_v2", "mobilenet_v1", "mobilenet_v2"],

      videoRatio: 1,
      resultWidth: 0,
      resultHeight: 0,
    };
  },
  methods: {
    initWebcamStream() {
      // if the browser supports mediaDevices.getUserMedia API
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices
          .getUserMedia({
            audio: false, // don't capture audio
            video: { facingMode: "environment" }, // use the rear camera if there is
          })
          .then((stream) => {
            // set <video> source as the webcam input
            let video = this.$refs.camera;
            // video.srcObject = stream;
            // video.play();
            try {
              video.srcObject = stream;
            } catch (error) {
              // support older browsers
              video.src = URL.createObjectURL(stream);
            }

            return new Promise((resolve) => {
              // when video is loaded
              video.onloadedmetadata = () => {
                // calculate the video ratio
                this.videoRatio = video.offsetHeight / video.offsetWidth;
                // add event listener on resize to reset the <video> and <canvas> sizes
                window.addEventListener("resize", this.setResultSize);

                this.isVideoStreamReady = true;
                console.log("webcam stream initialized");
                resolve();
              };
            });
          })
          .catch((error) => {
            console.log("failed to initialize webcam stream", error);
            throw error;
          });
      } else {
        console.log("failed");
      }
    },

    loadModel() {
      this.isModelReady = false;
      // if model already exists => dispose it and load a new one
      if (this.model) this.model.dispose();
      // load model with the baseModel
      return cocoSsd
        .load(this.baseModel)
        .then((model) => {
          this.model = model;
          this.isModelReady = true;
          console.log("model loaded");
        })
        .catch((error) => {
          console.log("failed to load the model", error);
          throw error;
        });
    },

    async detectObjects() {
      if (!this.isModelReady) return;

      let predictions = await this.model.detect(this.$refs.camera);
      this.printPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectObjects();
      });
    },

    loadModelAndStartDetecting() {
      this.modelPromise = this.loadModel();
      // wait for both stream and model promise finished
      // => start detecting objects
      Promise.all([this.streamPromise, this.modelPromise])
        .then(() => {
          this.detectObjects();
        })
        .catch((error) => {
          console.log("Failed to init stream and/or model");
          this.initFailMessage = error;
        });
    },

    printPredictions(predictions) {
      // get the context of canvas
      predictions.forEach((prediction) => {
        console.log(prediction.class);
      });
    },

    // init() {
    //   if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    //     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    //       // let videoPlayer = document.querySelector("video");
    //       const videoPlayer = this.$refs.camera;
    //       videoPlayer.srcObject = stream;
    //       videoPlayer.play();
    //     });
    //   } else {
    //     alert("Cannot get Media Devices");
    //   }
    // },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },
  },

  mounted() {
    this.streamPromise = this.initWebcamStream();
    this.loadModelAndStartDetecting();
  },
  // beforeMount() {
  //   this.init();
  // },
};
</script>

<style lang="scss">
.video-container {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.video-container video {
  min-width: 100%;
  min-height: 100%;
}
</style>
