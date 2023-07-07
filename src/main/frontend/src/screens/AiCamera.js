import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function AiCamera({setSidebarTitle, sidebarTitle}) {
  const [imageBase64, setImageBase64] = useState(null);
  const webcamRef = useRef(null);
  const webcamWidth = `${400}vw`;
  const webcamHeight = `${330}vh`;
  const videoConstraints = {
    facingMode: 'user', // 또는 'user'로 설정하여 전면 카메라를 사용할 수도 있습니다.
  };

  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageBase64(imageSrc);
  };

  useEffect(() => {
		//setInterval -> 0.5초마다 사진을 보내도록 함
    const intervalId = setInterval(captureFrame, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const sendData = async () => {
      if (imageBase64) {
        try {
          const words = sidebarTitle.split(" ").filter(word => word.trim() !== '');
          const lastWord = words[words.length - 1];
          const capturedImage = imageBase64;

          if (capturedImage !== imageBase64) {
            return; // 변경된 경우 처리 건너뜀
          }
					//correct_poses 의 라우터로 사진과 현재 학습중인 단어를 보냄
					//이때 사진은 Base64로 인코딩하여 보낸다
          const response = await axios.post("http://localhost:5000/transelate_image", {
            imageBase64: capturedImage,
            text: lastWord
          });
					//사진과 단어에 따른 자세 교정 문구를 받아와 화면에 띄워줌
          // Update sidebar title
          console.log(lastWord);
          const newResult = response.data.result;
              console.log(newResult);
              setSidebarTitle(newResult);
          } catch (error) {
              console.log(error);
            }
  }
    };

    sendData();
  }, [imageBase64, setSidebarTitle, sidebarTitle]);

  return (
    <div style={{ marginTop:'10%'}}>
      <Webcam videoConstraints={videoConstraints}  width={webcamWidth} height={webcamHeight} audio={false} ref={webcamRef} />
    </div>
  );
}

export default AiCamera;