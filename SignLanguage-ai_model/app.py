from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import base64
import re
import cv2
import edu_test
import logging
import correct_pose
import numpy as np

app = Flask(__name__)
CORS(app)


@app.route('/process_image',  methods=['POST'])
def process_image():

    if request.method == "POST":

        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64'])
        
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas2.png')
        
        text = edu_test.output_label()
        
    return jsonify({'result': text})


@app.route('/correct_poses', methods=['POST'])
def correct_poses():
    if request.method == "POST":

        text = request.json['text']
        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64'])
        
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas.png')
        
        processed_result = correct_pose.correct_poses(text)

        # 처리 결과 반환
        return jsonify({'result': processed_result})



if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)