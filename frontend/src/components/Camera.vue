<template>
  <div class="video-container">
    <Detail v-model="detailDialog" />
    <div class="scanInfo" color="primary" dark flat>
      <v-btn icon @click="openDetailDialog()" aria-label="세부 정보 조회 버튼">
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </div>
    <video ref="camera" autoplay></video>
    <canvas ref="canvas" :width="resultWidth" :height="resultHeight"></canvas>
  </div>
</template>

<script>
import Detail from "./Detail.vue";
import { mapActions } from "vuex";
import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
tf.setBackend("webgl");

const MODEL_URL =
  "https://raw.githubusercontent.com/Ji2z/vuetest/master/model8/model.json";
const threshold = 0.75;

let cntMap = new Map();
let nameSet = new Set();

let classesDir = {
  1: {
    name: "밀키스",
    type: "캔",
    id: 1,
  },
  2: {
    name: "칠성사이다",
    type: "캔",
    id: 2,
  },
  3: {
    name: "옥수수수염차",
    type: "페트병",
    id: 3,
  },
  4: {
    name: "참이슬",
    type: "유리병",
    id: 4,
  },
  5: {
    name: "웰치스 화이트그레이프",
    type: "캔",
    id: 5,
  },
  6: {
    name: "스프라이트",
    type: "캔",
    id: 6,
  },
  7: {
    name: "웰치스 포도",
    type: "캔",
    id: 7,
  },
  8: {
    name: "진로",
    type: "유리병",
    id: 8,
  },
};

export default {
  name: "Camera",
  components: {
    Detail,
  },
  data() {
    return {
      detailDialog: false,
      dialog: [],

      streamPromise: null,
      modelPromise: null,
      video: null,

      isVideoStreamReady: false,
      isModelReady: false,
      initFailMessage: "",

      model: null,

      videoRatio: 1,
      resultWidth: 0,
      resultHeight: 0,

      product: {
        name: null,
        type: null,
      },
    };
  },
  methods: {
    ...mapActions(["getProductDetail"]),
    async openDetailDialog() {
      await this.getProductDetail(this.product);
      this.detailDialog = true;
    },
    closeDeleteDialog() {
      this.$set(this.dialog, false);
    },
    // 웹캠 초기화
    initWebcamStream() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: { facingMode: "environment" },
          })
          .then((stream) => {
            this.video = this.$refs.camera;
            try {
              this.video.srcObject = stream;
            } catch (error) {
              this.video.src = URL.createObjectURL(stream);
            }

            return new Promise((resolve) => {
              this.video.onloadedmetadata = () => {
                this.videoRatio =
                  this.video.offsetHeight / this.video.offsetWidth;
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
    // 인공지능 모델 불러오기
    async loadModel() {
      this.isModelReady = false;
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
    // 감지 모델 저장 및 초기화
    initMap() {
      // console.log("init Map --- ", cntMap);
      cntMap.forEach(function (item, index) {
        if (item >= 5) nameSet.add(index);
      });
      // console.log("nameSet : ", nameSet);
      if (nameSet.size == 0) {
        console.log("감지된 음료가 없습니다.");
      } else if (nameSet.size == 1) {
        nameSet.forEach((item) => {
          console.log(
            "이름 : ",
            classesDir[item].name,
            " , 종류 : ",
            classesDir[item].type
          );
          this.product.name = classesDir[item].name;
          this.product.type = classesDir[item].type;
          console.log(this.product);
        });
      } else {
        console.log("더 가까이 가주세요.");
      }
      cntMap.clear();
      nameSet.clear();
    },
    // 모델 실시간 감지
    detectFrame(video, model) {
      console.log("detect");
      tf.engine().startScope();
      this.model.executeAsync(this.process_input(video)).then((predictions) => {
        this.renderPredictions(predictions, video);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
        tf.engine().endScope();
      });
    },
    // 모델 로딩 및 감지 시작
    loadModelAndStartDetecting() {
      this.modelPromise = this.loadModel();
      Promise.all([this.modelPromise, this.streamPromise])
        .then((values) => {
          this.detectFrame(this.video, values[0]);
          // 1초마다 감지 모델 초기화
          setInterval(this.initMap, 1000);
        })
        .catch((error) => {
          console.log("Failed to init stream and/or model");
          console.log(error);
          this.initFailMessage = error;
        });
    },
    // 비디오 프레임 확장
    process_input(video_frame) {
      const tfimg = tf.browser.fromPixels(video_frame).toInt();
      const expandedimg = tfimg.transpose([0, 1, 2]).expandDims();
      return expandedimg;
    },
    // 모델 예측
    renderPredictions(predictions) {
      const boxes = predictions[7].arraySync();
      const scores = predictions[5].arraySync();
      const classes = predictions[3].dataSync();
      this.buildDetectedObjects(scores, threshold, boxes, classes);
    },
    // 모델 예측 결과
    buildDetectedObjects(scores, threshold, boxes, classes) {
      scores[0].forEach((score, i) => {
        if (score > threshold) {
          let index = classes[i];
          if (cntMap.has(index)) {
            cntMap.set(index, cntMap.get(index) + 1);
          } else cntMap.set(index, 1);
          //console.log("------------------" + score.toFixed(4) + ", " + classesDir[classes[i]].name);
        }
      });
    },
    // 페이지 이동 시 카메라 종료
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

.scanInfo {
  width: 100%;
  height: 25%;
}
</style>
