from flask import Flask,render_template,send_from_directory,request, jsonify,make_response
from flask_cors import CORS, cross_origin
import boto3
import os

app = Flask(__name__ ,static_folder='client/build',static_url_path='')
cors = CORS(app)

@app.route('/home')
@cross_origin()
def check():
    return "Welcome to home"

@app.route('/')
@cross_origin()
def home():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')