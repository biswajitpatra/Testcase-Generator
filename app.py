from flask import Flask,render_template,send_from_directory,request, jsonify,make_response,Response
from flask_cors import CORS, cross_origin
from time import sleep
from server.main import get_sample_output, compare_code
import json


app = Flask(__name__ ,static_folder='client/build',static_url_path='')
cors = CORS(app)

def event_stream(func,*args):
    for val in func(*args):
            yield "data:" + json.dumps(val) + " \n\n"

@app.route('/sample_output',methods=['POST'])
@cross_origin()
def sample_output():
    content = request.get_json()
    print(content)
    try:
        output = get_sample_output(content)
    except Exception as e:
        output = str(e)
    return output

@app.route('/compare_code',methods=["POST"])
@cross_origin()
def compare_code_request():
    content = request.get_json()
    print(content)
    return Response(event_stream(compare_code,content),mimetype="text/event-stream")

@app.route('/')
@cross_origin()
def home():
    return app.send_static_file('index.html')

@app.after_request
def add_header(response):
    if 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'no-transform'
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)