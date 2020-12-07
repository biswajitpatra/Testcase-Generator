from flask import Flask,render_template,send_from_directory,request, jsonify,make_response,Response
from flask_cors import CORS, cross_origin
import boto3
from time import sleep
from server.main import get_sample_output, compare_code
import json


app = Flask(__name__ ,static_folder='client/build',static_url_path='')
cors = CORS(app)

def event_stream(func,*args):
    for val in func(*args):
            yield "data:" + json.dumps(val) + " \n\n"



# @app.route('/home',methods=['POST'])
# @cross_origin()
# def check():
#     # print(request.get_json())
#     def generate():
#         y=1
#         while True:
#             if y<2:
#                 sleep(0.25)
#                 print(y)
#                 yield {'progress':y}
#             else:
#                 yield {'message':"WEELL DONE YOU CAN DO IT",'success':False,'inp':"check this outfaskjddddddddddddvvvvvvvvvvvvvvvvvvvvvfsfjkgdsh\n\n\nfjasjas",'file1':'xst ok its ok\n\n\n\n\n\n\n\n\n\n\n\nfsajkfak','file2':'ast'}
#                 break
#             y+=1
#     return Response(event_stream(generate),mimetype="text/event-stream")

@app.route('/sample_output',methods=['POST'])
@cross_origin()
def sample_output():
    content = request.get_json()
    print(content)
    output = get_sample_output(content)
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