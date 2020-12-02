from flask import Flask,render_template,send_from_directory,request, jsonify,make_response
from flask_cors import CORS, cross_origin
import boto3
from server.main import get_sample_output

app = Flask(__name__ ,static_folder='client/build',static_url_path='')
cors = CORS(app)

@app.route('/home')
@cross_origin()
def check():
    return "hello world"

@app.route('/sample_output',methods=['POST'])
@cross_origin()
def sample_output():
    content = request.get_json()
    output = get_sample_output(content)
    return output

@app.route('/')
@cross_origin()
def home():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)