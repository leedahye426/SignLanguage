from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import base64
import re
import cv2
import edu_test
import logging

app = Flask(__name__)
CORS(app)

@app.route('/process_image',  methods=['POST'])
def process_image():

    if request.method == "POST":

        image_base64 = request.json.get('imageBase64')
        image_data = base64.b64decode(image_base64.split(',')[1])
        image = Image.open(BytesIO(image_data))
        # 이미지 서버에 저장
        image.save('canvas.png')
        
        text = edu_test.output_label()
        
    return jsonify({'result': text})

if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)