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
import testPage

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

@app.route('/test', methods=['POST'])
def test_pose():
    if request.method == "POST":
        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64'])

        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas3.png')

        text = testPage.correct_poses(request.json['word'])

        # 이미지와 결과 텍스트를 함께 반환
        with open('canvas3.png', 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

        return jsonify({'image': encoded_image, 'result': text})


@app.route('/transelate_image',  methods=['POST'])
def transelate_image():

    if request.method == "POST":

        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64']) ## -----------------------------##

        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas2.png')

        text = traselate.output_label()

        if type(text) == None:
            return jsonify({'result': "짜장면"})

    return jsonify({'result': "짜장면"})
if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)