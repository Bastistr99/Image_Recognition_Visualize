#app.py
from flask import Flask, json, request, jsonify
import os
import urllib.request
from werkzeug.utils import secure_filename
import tensorflow as tf
import cv2 
from json import JSONEncoder
import numpy as np
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


#app.secret_key = "caircocoders-ednalan"
 
UPLOAD_FOLDER = './pictures'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
 
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
 
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



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

@app.route('/')
def main():
    return 'Homepage'
 
@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
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
            success = True
        else:
            errors[file.filename] = 'File type is not allowed'
 
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        prediction = model.predict(prepare(filepath), verbose=1)
        encodedNumpyData = json.dumps(prediction, cls=NumpyArrayEncoder) 
        resp = jsonify({"message": encodedNumpyData})
        resp.status_code = 201
        print(prediction)
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
 
if __name__ == '__main__':
    app.run(debug=True)