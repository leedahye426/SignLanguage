import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function AiCamera() {
  const [imageBase64, setImageBase64] = useState(null);
  const [resultText, setResultText] = useState(null);
  const webcamRef = useRef(null);
  const webcamWidth = `${470}vw`;
  const webcamHeight = `${430}vh`;

  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageBase64(imageSrc);
  };

  useEffect(() => {
		//setInterval -> 0.5초마다 사진을 보내도록 함
    const intervalId = setInterval(captureFrame, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const sendData = async () => {
      if (imageBase64) {
        try {
					//correct_poses 의 라우터로 사진과 현재 학습중인 단어를 보냄
					//이때 사진은 Base64로 인코딩하여 보낸다
          const response = await axios.post("http://localhost:5000/process_image", {
            imageBase64: imageBase64
          });
					//사진과 단어에 따른 자세 교정 문구를 받아와 화면에 띄워줌
          setResultText(response.data.result);
        } catch (error) {
          console.log(error);
        }
      }
    };

    sendData();
  }, [imageBase64]);

  return (
    <div>
      <Webcam width={webcamWidth} height={webcamHeight} audio={false} ref={webcamRef}/>
      <div>Result: {resultText}</div>
    </div>
  );
}

export default AiCamera;