<template>
  <div class="video-container">
    <!-- <video autoplay ref="camera" /> -->
    <video ref="camera" autoplay></video>
    <canvas ref="canvas" :width="resultWidth" :height="resultHeight"></canvas>
  </div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
tf.setBackend("webgl");

const MODEL_URL =
  "https://raw.githubusercontent.com/Ji2z/vuetest/master/model7/model.json";
const threshold = 0.75;

let classesDir = {
  1: {
    name: "milkis",
    id: 1,
  },
  2: {
    name: "cider",
    id: 2,
  },
};

export default {
  name: "Camera",
  data() {
    return {
      // store the promises of initialization
      streamPromise: null,
      modelPromise: null,
      video: null,

      // control the UI visibilities
      isVideoStreamReady: false,
      isModelReady: false,
      initFailMessage: "",

      // tfjs model related
      model: null,

      videoRatio: 1,
      resultWidth: 0,
      resultHeight: 0,

      names: ["milkis", "cider"],
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
            this.video = this.$refs.camera;
            try {
              this.video.srcObject = stream;
            } catch (error) {
              // support older browsers
              this.video.src = URL.createObjectURL(stream);
            }

            return new Promise((resolve) => {
              // when video is loaded
              this.video.onloadedmetadata = () => {
                // calculate the video ratio
                this.videoRatio =
                  this.video.offsetHeight / this.video.offsetWidth;
                // add event listener on resize to reset the <video> and <canvas> sizes
                //window.addEventListener("resize", this.setResultSize);
                // set the initial size
                //this.setResultSize();

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
    async loadModel() {
      this.isModelReady = false;

      // load the model with loadGraphModel
      return loadGraphModel(MODEL_URL)
        .then((model) => {
          this.model = model;
          this.isModelReady = true;
          console.log("model loaded: ", model);
        })
        .catch((error) => {
          console.log("failed to load the model", error);
          throw error;
        });
    },

    detectFrame(video, model) {
      //console.log("detect");
      tf.engine().startScope();
      //console.log("detect start");
      this.model.executeAsync(this.process_input(video)).then((predictions) => {
        //console.log("render");
        this.renderPredictions(predictions, video);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
        tf.engine().endScope();
      });
    },
    loadModelAndStartDetecting() {
      this.modelPromise = this.loadModel();
      // wait for both stream and model promise finished
      // => start detecting objects
      Promise.all([this.modelPromise, this.streamPromise])
        .then((values) => {
          this.detectFrame(this.video, values[0]);
        })
        .catch((error) => {
          console.log("Failed to init stream and/or model");
          console.log(error);
          this.initFailMessage = error;
        });
    },
    process_input(video_frame) {
      //console.log("process_input");
      const tfimg = tf.browser.fromPixels(video_frame).toInt();
      const expandedimg = tfimg.transpose([0, 1, 2]).expandDims();
      return expandedimg;
    },
    renderPredictions(predictions) {
      //console.log("render start");
      const boxes = predictions[1].arraySync();
      const scores = predictions[4].arraySync();
      const classes = predictions[2].dataSync();
      this.buildDetectedObjects(scores, threshold, boxes, classes, classesDir);
    },
    buildDetectedObjects(scores, threshold, boxes, classes, classesDir) {
      scores[0].forEach((score, i) => {
        // console.log(score);
        if (score > threshold) {
          console.log(
            "------------------" +
              score.toFixed(4) +
              ", " +
              classesDir[classes[i]].name
          );
        }
      });
    },
    printPredictions(predictions) {
      // get the context of canvas
      predictions.forEach((prediction) => {
        // if (prediction.class != undefined) {
        //   console.log(prediction.class);
        // }
        console.log(prediction.class);
      });
    },
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
