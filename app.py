from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import base64
import re
import cv2
import logging
import correct_pose
import numpy as np
import traselate

app = Flask(__name__)
CORS(app)



@app.route('/correct_poses', methods=['POST'])
def correct_poses():
    if request.method == "POST":
        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64']) ## -------------------- ##
        
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas.png')
        
        text = correct_pose.correct_poses(request.json['text'])
        
        # 이미지와 결과 텍스트를 함께 반환
        with open('canvas.png', 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        
        return jsonify({'image': encoded_image, 'result': text}) ## -----------------------------##

@app.route('/transelate_image',  methods=['POST'])
def transelate_image():

    if request.method == "POST":

        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64']) ## -----------------------------##
        
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas2.png')
        
        text = traselate.output_label()
        
    return jsonify({'result': text})
if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)