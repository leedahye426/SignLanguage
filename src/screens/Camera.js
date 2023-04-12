import React from 'react'
import Webcam from "react-webcam";
import { Button } from '@mui/material';

const getWebcam = (callback) => {
    try {
      const constraints = {
        'video': true,
        'audio': false
      }
      navigator.mediaDevices.getUserMedia(constraints)
        .then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  
  const Styles = {
    Video: { width: "100%", height: "100%" },
    None: { display: 'none' },
  }

  function Camera() {
    const [playing, setPlaying] = React.useState(undefined);
  
    const videoRef = React.useRef(null);
  
    React.useEffect(() => {
      getWebcam((stream => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      }));
    }, []);
  
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
        <video ref={videoRef} autoPlay style={Styles.Video} />
        <Button variant='outlined' onClick={() => startOrStop()}>
            {playing ? 'Stop' : 'Start'} 
        </Button>
      </div >
    </>);
  }
  
  export default Camera;