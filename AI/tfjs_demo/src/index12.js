//import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
//import * as knnClassifier from '@tensorflow-models/knn-classifier';
const webcamElement = document.getElementById('webcam');
//const classifier = knnClassifier.create();

let net;

let names = ['milkis', 'cider'];

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  //net = await mobilenet.load();
  net = await loadGraphModel('https://raw.githubusercontent.com/Ji2z/vuetest/master/model6/model.json');
  console.log('Successfully loaded model');

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);
  while (true) {
    console.log('---------------------')
    const img = await webcam.capture();
    
    //const result = await net.classify(img);
    //img = img.reshape([1,224,224,3])
    img = img.expandDims(0);
    //const result = net.executeAsync(img);
    net.executeAsync(img).then(predictions => {
      // ================================ model 5 ================================
      // [0] shape 1
      // [1] shape 1, 100, 4                          : box
      // [2] shape 1, 1917, 4
      // [3] shape 1, 100     - [1273, 1393 ...]
      // [4] shape 1, 1917, 3
      // [5] shape 1, 100     - [1, 1, 1, 2 ...]      : class
      // [6] shape 1, 100, 3
      // [7] shape 1, 100     - [0.3870, 0.2231, ...] : score
      // ================================ model 6 ================================
      // [0] shape 1, 1917, 3
      // [1] shape 1
      // [2] shape 1, 10      - [1916, 1865, ...]
      // [3] shape 1, 10      - [2, 2, 1, 1, ...]       : class
      // [4] shape 1, 10      - [0.7506, 0.50615 ...]   : score
      // [5] shape 1, 10, 4                             : box
      // [6] shape 1, 1917, 4
      // [7] shape 1, 10, 3
      
      let scores = predictions[4].arraySync()[0];
      let classes = predictions[3].arraySync()[0];
      scores.forEach((score, i) => {
        if (score > 0.8) {
          document.getElementById('console').innerText = `${score*100}%, ${names[classes[i]]}`
        }
      });

    });

    //document.getElementById('console').innerText = `${result}`
    // `
    //   prediction: ${result[0].className}\n
    //   probability: ${result[0].probability}
    // `;
    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }
}

app();