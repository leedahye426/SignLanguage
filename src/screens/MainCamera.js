import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Progress from "./Progress";
import { Button } from '@mui/material';

function MainCamera() {
  const [imageBase64, setImageBase64] = useState(null);
  const [resultText, setResultText] = useState(null);
  const webcamRef = useRef(null);
  const webcamWidth = `${370}vw`;
  const webcamHeight = `${330}vh`;
  const videoConstraints = {
    facingMode: 'user', // 또는 'user'로 설정하여 전면 카메라를 사용할 수도 있습니다.
  };
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageBase64(imageSrc);
  };

  const updateProgress = () => {
    if (resultText === 'OK') {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 20;
        } else {
          return prevProgress;
        }
      });
    }
  };
  const sendProgress = () => {
    axios
      .post('http://localhost:8080/api/progress', { progress }) // Update the endpoint URL to match your Spring server's API endpoint
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          const response = await axios.post("http://localhost:5000/correct_poses", {
            imageBase64: imageBase64,
            text: "turnOnAngles",
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

  useEffect(() => {
    updateProgress();
  }, [resultText]);

  useEffect(() => {
    if (progress === 100) {
      setShowButton(true);
    }
  }, [progress]);

  return (
    <div>
      <Webcam videoConstraints={videoConstraints}  width={webcamWidth} height={webcamHeight} audio={false} ref={webcamRef}/>
      <div style={{marginBottom: '20px'}}>Result: {resultText}</div>
      <Progress percent={`${progress}%`}/>
      {showButton && <Button variant="outlined" color="success" sx={{mr:3, mt:1}} onClick={sendProgress}>학습 완료 !!</Button>}
    </div>
  );
}

export default MainCamera;