<template>
  <div class="video-container">
    <Detail v-model="detailDialog" />
    <div justify-center align-center class="scanInfo mx-auto">
      <v-layout
        justify-center
        align-center
        fill-height
        v-if="product.name && !pathCheck(3)"
      >
        <div style="text-align: center">
          <div>
            <span class="accentInfo">
              {{ product.name }} ({{ product.type }})
            </span>
            <span class="secondaryInfo">입니다.</span>
          </div>
          <div v-if="pathCheck(1)">
            <v-btn
              icon
              @click="openDetailDialog()"
              aria-label="세부 정보 조회 버튼"
            >
              <v-icon color="accent">mdi-information</v-icon>
              <span class="detailInfo"> 세부정보 확인하기</span>
            </v-btn>
          </div>
          <div v-else-if="pathCheck(2)">
            <v-btn
              icon
              @click="favoriteRegist()"
              aria-label="즐겨찾기 등록 버튼"
            >
              <v-icon color="accent">mdi-clipboard-list-outline</v-icon>
              <span class="detailInfo"> 즐겨찾기 등록</span>
            </v-btn>
          </div>
        </div>
      </v-layout>
      <v-layout justify-center align-center fill-height v-if="pathCheck(3)">
        <span>
          <h2 class="alertInfo">
            <div class="searchInfo">{{ searchName }} ({{ searchType }})</div>
            <div v-html="replaceHtml(searchAlertText)"></div>
          </h2>
        </span>
      </v-layout>
      <v-layout
        justify-center
        align-center
        fill-height
        v-if="!pathCheck(3) && !product.name"
      >
        <span
          ><h2 class="alertInfo">{{ this.alertText }}</h2></span
        >
      </v-layout>
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
  "https://raw.githubusercontent.com/Ji2z/vuetest/master/model9/model.json";
const threshold = 0.75;

let cntMap = new Map();
let nameSet = new Set();

let classesDir = {
  1: {
    name: "데미소다 자몽",
    type: "캔",
    id: 1,
  },
  2: {
    name: "데미소다 애플",
    type: "캔",
    id: 2,
  },
  3: {
    name: "게토레이",
    type: "캔",
    id: 3,
  },
  4: {
    name: "갈아만든 배",
    type: "캔",
    id: 4,
  },
  5: {
    name: "레쓰비",
    type: "캔",
    id: 5,
  },
  6: {
    name: "TOP 스위트아메리카노",
    type: "캔",
    id: 6,
  },
  7: {
    name: "마운틴듀",
    type: "캔",
    id: 7,
  },
  8: {
    name: "TOP 마스터라떼",
    type: "캔",
    id: 8,
  },
  9: {
    name: "컨디션 헛개",
    type: "유리병",
    id: 9,
  },
  10: {
    name: "컨디션 레이디",
    type: "유리병",
    id: 10,
  },
  11: {
    name: "컨디션 CEO",
    type: "유리병",
    id: 11,
  },
  12: {
    name: "코카콜라",
    type: "캔",
    id: 12,
  },
  13: {
    name: "코카콜라제로",
    type: "캔",
    id: 13,
  },
  14: {
    name: "테라",
    type: "캔",
    id: 14,
  },
  15: {
    name: "파워에읻,",
    type: "캔",
    id: 15,
  },
  16: {
    name: "펩시",
    type: "캔",
    id: 16,
  },
  17: {
    name: "포카리스웨트",
    type: "캔",
    id: 17,
  },
  18: {
    name: "하늘보리",
    type: "페트병",
    id: 18,
  },
  19: {
    name: "하이트 엑스트라콜드",
    type: "캔",
    id: 19,
  },
  20: {
    name: "핫식스",
    type: "캔",
    id: 20,
  },
  21: {
    name: "환타 오렌지",
    type: "캔",
    id: 21,
  },
  22: {
    name: "환타 파인애플",
    type: "캔",
    id: 22,
  },
  23: {
    name: "몬스터에너지 울트라",
    type: "캔",
    id: 23,
  },
  24: {
    name: "몬스터에너지 그린",
    type: "캔",
    id: 24,
  },
  25: {
    name: "밀키스",
    type: "캔",
    id: 25,
  },
  26: {
    name: "박카스",
    type: "유리병",
    id: 26,
  },
  27: {
    name: "포도 봉봉",
    type: "캔",
    id: 27,
  },
  28: {
    name: "비락식혜",
    type: "캔",
    id: 28,
  },
  29: {
    name: "비타500",
    type: "유리병",
    id: 29,
  },
  30: {
    name: "스프라이트",
    type: "캔",
    id: 30,
  },
  31: {
    name: "옥수수수염차",
    type: "페트병",
    id: 31,
  },
  32: {
    name: "웰치스 포도",
    type: "캔",
    id: 32,
  },
  33: {
    name: "웰치스 화이트그레이프",
    type: "캔",
    id: 33,
  },
  34: {
    name: "진로",
    type: "유리병",
    id: 34,
  },
  35: {
    name: "참이슬",
    type: "유리병",
    id: 35,
  },
  36: {
    name: "칠성사이다",
    type: "캔",
    id: 36,
  },
  37: {
    name: "카스 라이트",
    type: "캔",
    id: 37,
  },
  38: {
    name: "카스",
    type: "캔",
    id: 38,
  },
};

export default {
  name: "Camera",
  props: {
    path: String,
  },
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
      alertText: "감지된 음료가 없습니다.",
      searchAlertText: "탐색 음료가 존재하지 않습니다.",

      searchName: "",
      searchType: "",
    };
  },
  methods: {
    ...mapActions(["getProductDetail"]),
    replaceHtml(input) {
      return input.replace("\n", "<br />");
    },
    favoriteRegist() {
      let storeProduct = {
        name: this.product.name,
        type: this.product.type,
      };
      let storeMap = [];
      if (localStorage.getItem("favorite") == null) {
        storeMap.push(storeProduct);
      } else {
        storeMap = JSON.parse(localStorage.getItem("favorite"));
        storeMap.push(storeProduct);
      }
      localStorage.setItem("favorite", JSON.stringify(storeMap));
      this.$router.go(-1);
    },
    pathCheck(pathNum) {
      console.log(pathNum);
      if (this.path == "scan" && pathNum == 1) return true;
      else if (this.path == "search" && (pathNum == 1 || pathNum == 3))
        return true;
      else if (this.path == "favoriteAdd" && pathNum == 2) return true;
      return false;
    },
    // 세부정보 모달
    async openDetailDialog() {
      if (this.product.name != null) {
        await this.getProductDetail(this.product);
        this.detailDialog = true;
      }
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
        this.product.name = null;
        this.alertText = "감지된 음료가 없습니다.";
        this.searchAlertText = "탐색 음료가 존재하지 않습니다.";
      } else {
        nameSet.forEach((item) => {
          console.log(
            "이름 : ",
            classesDir[item].name,
            " , 종류 : ",
            classesDir[item].type
          );
          this.product.name = classesDir[item].name;
          this.product.type = classesDir[item].type;
          console.log("search NAme : ", this.searchName);
          console.log("search type : ", this.searchType);
          if (
            this.product.name == this.searchName &&
            this.product.type == this.searchType
          ) {
            console.log("탐색하는거 찾음");
            if (nameSet.size == 1) this.searchAlertText = "탐색 음료 입니다!";
            else
              this.searchAlertText =
                "탐색 음료가 존재합니다.\n더 가까이 가주세요.";
          }
        });
        if (nameSet.size > 1 && this.path != "search") {
          this.product.name = null;
          this.alertText = "더 가까이 가주세요.";
        }
      }
      cntMap.clear();
      nameSet.clear();
    },
    // 모델 실시간 감지
    detectFrame(video, model) {
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
      const boxes = predictions[4].arraySync();
      const scores = predictions[1].arraySync();
      const classes = predictions[2].dataSync();
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
  created() {
    if (this.path == "search") {
      this.searchName = this.$route.params.name;
      this.searchType = this.$route.params.type;
    }
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
  height: 20%;
  background-color: #212121;
}

.accentInfo {
  color: #3ff23f !important;
  font-size: 170%;
  font-weight: bold;
}

.secondaryInfo {
  color: #f5f5f5 !important;
  font-size: 160%;
  font-weight: bold;
}

.detailInfo {
  color: #f5f5f5 !important;
  font-size: 110%;
}

.alertInfo {
  color: #f5f5f5;
  text-align: center;
}

.searchInfo {
  color: #3ff23f !important;
  font-size: 100%;
  font-weight: bold;
}
</style>
