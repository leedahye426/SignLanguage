import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Button } from '@mui/material';

function TestCamera(props) {
  const { sign } = props;
    const [imageBase64, setImageBase64] = useState(null);
    const [resultText, setResultText] = useState(null);
    const webcamRef = useRef(null);
    const webcamWidth = `${370}vw`;
    const webcamHeight = `${330}vh`;
    const [showButton, setShowButton] = useState(false);

    const videoConstraints = {
      facingMode: 'user', // 또는 'user'로 설정하여 전면 카메라를 사용할 수도 있습니다.
    };


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
  		  const word = sign.word;
            const response = await axios.post("http://localhost:5000/test_pose", {
              imageBase64: imageBase64,
              text: word,
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
    if (resultText === "OK") {
      setShowButton(true);

    }
    }, [resultText]);


    return (
      <div style={{ marginTop:'10%'}}>
        <Webcam videoConstraints={videoConstraints}  width={webcamWidth} height={webcamHeight} audio={false} ref={webcamRef} />
          <div className ="result" style={{marginBottom: '20px'}}>{sign.word}: {resultText}</div>
          {showButton && <Button variant="outlined" color="success" sx={{mr:3, mt:1}} >다음 단어 테스트하기</Button>}
      </div>

    );
  }

export default TestCamera;