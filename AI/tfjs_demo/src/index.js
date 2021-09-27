import React from "react";
import ReactDOM from "react-dom";
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import "./styles.css";
tf.setBackend('webgl');

const threshold = 0.75;
var model = '';

async function load_model() {
    // It's possible to load the model locally or from a repo
    // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
    //const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
  //const model = await loadGraphModel('https://raw.githubusercontent.com/Ji2z/vuetest/master/model2/model.json');
  model = await loadGraphModel('https://raw.githubusercontent.com/Ji2z/vuetest/master/model8/model.json');
  console.log(model)
    return model;
  }

  let classesDir = {
    1: {
      name: "milkis",
      id: 1,
    },
    2: {
      name: "cider",
      id: 2,
    },
    3: {
      name: "corn_silk_tea",
      id: 3,
    },
    4: {
      name: "chamisul_fresh",
      id: 4,
    },
    5: {
      name: "welchs_whitegrape",
      id: 5,
    },
    6: {
      name: "sprite",
      id: 6,
    },
    7: {
      name: "welchs_grape",
      id: 7,
    },
    8: {
      name: "jinro_soju",
      id: 8,
    },
  };

class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();


  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });

      const modelPromise = load_model();

      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

    detectFrame = (video, model) => {
        tf.engine().startScope();
      //model.executeAsync(this.process_input(video), ['detection_multiclass_scores','num_detections','detection_boxes']).then(predictions => {
      model.executeAsync(this.process_input(video)).then(predictions => {
        // let data1 = predictions[0].dataSync()
        // let data2 = predictions[1].dataSync()
        // let data3 = predictions[2].dataSync()
        // console.log('예상결과1: ', data1)
        // console.log('예상결과2: ', data2)
        // console.log('예상결과3: ', data3)
        this.renderPredictions(predictions, video);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
        tf.engine().endScope();
      });
  };

  process_input(video_frame){
    const tfimg = tf.browser.fromPixels(video_frame).toInt();
    const expandedimg = tfimg.transpose([0,1,2]).expandDims();
    return expandedimg;
  };

  buildDetectedObjects(scores, threshold, boxes, classes, classesDir) {
    const detectionObjects = []
    var video_frame = document.getElementById('frame');
    //console.log(scores + ", "  + ", " + classes)
    //console.log(classesDir)

    scores[0].forEach((score, i) => {
      console.log(score)
      if (score > threshold) {
        console.log("------------------"+score.toFixed(4)+", "+classesDir[classes[i]].name)
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox
        })
      }
    })
    return detectionObjects
  }

  renderPredictions = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    console.log("----------------------")
    //console.log(model.signature.outputs.num_detections)
    //console.log(predictions)

    // console.log("아아아")
    // console.log(predictions[0].arraySync())
    // console.log(predictions[1].arraySync())
    // console.log(predictions[2].arraySync())
    // console.log(predictions[3].arraySync())
    // console.log(predictions[4].arraySync())
    // console.log(predictions[5].arraySync())
    // console.log(predictions[6].arraySync())
    // console.log(predictions[7].arraySync())

    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    //Getting predictions
    const boxes = predictions[7].arraySync();
    const scores = predictions[5].arraySync();
    const classes = predictions[3].dataSync();
    const detections = this.buildDetectedObjects(scores, threshold,
                                    boxes, classes, classesDir);

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];
      const width = item['bbox'][2];
      const height = item['bbox'][3];

      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%").width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(item["label"] + " " + (100*item["score"]).toFixed(2) + "%", x, y);
    });
  };

  render() {
    return (
      <div>
        <h1>Real-Time Object Detection: Kangaroo</h1>
        <h3>MobileNetV2</h3>
        <video
          style={{height: '400px', width: "800px"}}
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="800"
          height="400"
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="800"
          height="400"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
