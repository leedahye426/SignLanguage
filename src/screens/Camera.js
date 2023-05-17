import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const Styles = {
  Video: { width: "100%", height: "100%" },
  None: { display: 'none' },
}


function Camera() {
  const [playing, setPlaying] = React.useState(undefined);
  const videoRef = React.useRef(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [resultText, setResultText] = useState(null);

  const captureScreenshot = () => {
    const videoElement = videoRef.current;
  
    if (videoElement) {
      const stream = videoElement.captureStream();
      const videoTrack = stream.getVideoTracks()[0];
  
      const imageCapture = new ImageCapture(videoTrack);
      imageCapture.grabFrame()
        .then((imageBitmap) => {
          const canvas = document.createElement('canvas');
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
  
          const context = canvas.getContext('2d');
          context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
  
          const screenshotUrl = canvas.toDataURL('image/png');
          // screenshotUrl을 사용하여 스크린샷을 처리하거나 표시합니다.
          return screenshotUrl;
        })
        .catch((error) => {
          console.error('스크린샷 캡처 중 오류 발생:', error);
        });
    }
  };

  const captureFrame = () => {
    const imageSrc = captureScreenshot();
    setImageBase64(imageSrc);
  };
  useEffect(() => {
    //setInterval -> 0.5초마다 사진을 보내도록 함
    const intervalId = setInterval(captureFrame, 500);
  
    return () => clearInterval(intervalId);
  }, []);

  const getWebcam = async (callback) => {
    if(imageBase64){
      try {
        const constraints = {
          'video': true,
          'audio': false
        }
        navigator.mediaDevices.getUserMedia(constraints)
          .then(callback);
          //correct_poses 의 라우터로 사진과 현재 학습중인 단어를 보냄
          //이때 사진은 Base64로 인코딩하여 보낸다
          const response = await axios.post("http://localhost:5000/correct_poses", {
            imageBase64: imageBase64,
            text: "turnOnAngles"
          });
          //사진과 단어에 따른 자세 교정 문구를 받아와 화면에 띄워줌
          setResultText(response.data.result);
      } catch (err) {
        console.log(err);
        return undefined;
      }
    }
}
  

  React.useEffect(() => {
    getWebcam((stream => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    }));
  }, [imageBase64]);

  const startOrStop = () => {
    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((stream => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      }));
    }
    setPlaying(!playing);
  }

  return (<>
    <div style={{ width: '23vw', height: '50vh', padding: '1em' }}>
      <video ref={videoRef} playsInline autoPlay style={Styles.Video} />
      <Button variant='outlined' onClick={() => startOrStop()}>
          {playing ? 'Stop' : 'Start'} 
      </Button>
      <div>Result: {resultText}</div>
    </div >
  </>);
}
  
  export default Camera;