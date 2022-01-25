from flask import Flask
from flask_cors import CORS
from backend import upload_route, get_image_route

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = './pictures'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
 
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
 
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#test

@app.route("/")
def first_route():
    return "<h1>Hello</h1>"

@app.route('/getimage/<filename>')
def getimage(filename):
    return get_image_route(filename)
    

@app.route('/upload', methods=['POST'])
def upload_image(): 
    return upload_route(allowed_file, app)
