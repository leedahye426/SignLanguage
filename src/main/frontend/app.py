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
import net_translate
import testPage
import os
import ffmpeg

from chatgpt_api import call_chatgpt_api
app = Flask(__name__)
CORS(app)



@app.route('/correct_poses', methods=['POST'])
def correct_poses():
    if request.method == "POST":
        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64'])
        
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas.png')
        
        text = correct_pose.correct_poses(request.json['text'])

        # 이미지와 결과 텍스트를 함께 반환
        with open('canvas.png', 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        
        return jsonify({'image': encoded_image, 'result': text})


@app.route('/transelate_image',  methods=['POST'])
def transelate_image():

    if request.method == "POST":
        try:
            video_blob = request.files['webcamVideo']
            video_data = video_blob.read()

            # Blob 데이터를 파일로 저장
            video_file_path = 'uploaded_video.mp4'

            with open(video_file_path, 'wb') as video_file:
                video_file.write(video_data)

            output_file_path = 'trimmed_video.mp4'

            # 기존 파일이 존재하면 삭제
            if os.path.exists(output_file_path):
                os.remove(output_file_path)

            # 영상의 처음 3초를 자르기 (시작 시간: 0 초, 종료 시간: 영상의 끝까지)
            ffmpeg.input(video_file_path, ss=3).output(output_file_path).run()

            text = net_translate.output_label(output_file_path)

            # if not text:  # 텍스트가 비어있을 경우 "?" 반환
            #     text = "?"

            system = "당신은 주어지는 문장에서 ?를 제거하고 적절히 띄어쓰기를 추가하고 같은 단어가 반복해서 나오면 중복을 제거하고 한 번만 남겨두고 문맥이 매끄럽게 조사를 추가하여 문장을 매끄럽게 다듬어서 자연스러운 문장을 출력해주는 시스템입니다."
            chatgpt_response = call_chatgpt_api(text, system)

            return jsonify({'result': chatgpt_response}), 200
        except Exception as e:
            return {'error': str(e)}, 500
        


    # return jsonify({'result': chatgpt_response})

@app.route('/test_pose', methods=['POST'])
def test_pose():
    if request.method == "POST":
        image_data = re.sub('^data:image/.+;base64,', '', request.json['imageBase64'])
        
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        # 이미지 서버에 저장
        im.save('canvas3.png')
        
        text = testPage.correct_poses(request.json['text'])
        
        # 이미지와 결과 텍스트를 함께 반환
        with open('canvas3.png', 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        
        return jsonify({'image': encoded_image, 'result': text})
    
if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)