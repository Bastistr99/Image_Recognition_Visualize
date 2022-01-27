import tensorflow as tf
import cv2
from json import JSONEncoder
import base64
import numpy as np
from PIL import Image
from werkzeug.utils import secure_filename
from flask import json, request, jsonify
import os
from removebg import RemoveBg
from dotenv import load_dotenv


load_dotenv()

apikey = os.getenv("api-token")
rmbg = RemoveBg(apikey, "error.log")

model = tf.keras.models.load_model("CatsVsDogs-CNN.model")
def prepare(filepath):
    img_size = 100;
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (img_size, img_size));
    return new_array.reshape(-1, img_size, img_size, 3);

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

def get_base64_encoded_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read())

def get_image_route(filename):
    filepath = "pictures/" + filename + "_no_bg.png"
    encoded_img_data = get_base64_encoded_image(filepath)
    os.remove(filepath)
    return encoded_img_data

def upload_route(allowed_file, app):
    # check if the post request has the file part
    if 'bild' not in request.files:
        resp = jsonify({'message' : 'No file part in the request'})
        resp.status_code = 400
        return resp
 
    files = request.files.getlist('bild')
     
    errors = {}
    success = False
    filepath = ""
     
    for file in files:      
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            filepath = "./pictures/" + filename
            image = Image.open(filepath)
            rmbg.remove_background_from_img_file(filepath)
            width, height = image.size
            success = True
        else:
            errors[file.filename] = 'File type is not allowed'
 
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        prediction = model.predict(prepare(filepath), verbose=0)
        encodedNumpyData = json.dumps(prediction, cls=NumpyArrayEncoder) 
        resp = jsonify({"message": encodedNumpyData, "prediction": str(prediction[0][0]), "height": str(height), "width": str(width)})
       # os.remove(filepath)
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
