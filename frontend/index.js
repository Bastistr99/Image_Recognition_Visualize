import * as tf from '@tensorflow/tfjs-node';

const getprediction = async () => {
    try{
        const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json');
        const prediction =  model.predict(['frontend/100px-PuppyDogEyes.jpeg']);
        console.log(prediction)
    }
    catch (err) {
        console.error(err);
    }
    
}

getprediction();
