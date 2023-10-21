import React, {useRef, useState, useEffect} from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components'

const WebcamRecorder = ({setSidebarTitle, sidebarTitle}) => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const webcamWidth = `${400}vw`;
    const webcamHeight = `${330}vh`;
    const [isRecording, setIsRecording] = useState(false);
    const [countdown, setCountdown] = useState(null)

    //카운트다운 코드
    useEffect(() => {
        if (countdown > 0) {
            const intervalId = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [countdown]);

    // 녹화 시작
    const startRecording = () => {
        setCountdown(3)
        const stream = webcamRef.current.video.srcObject; // 현재 웹캠 컴포넌트에서 오는 비디오 스트림을 stream 변수에 저장
        mediaRecorderRef.current = new MediaRecorder(stream);  // 녹화 시작
        const chunks = []; //녹화된 비디오 저장
        mediaRecorderRef.current.ondataavailable = (event) => { //녹화가 진행되는 동안 청크가 event에 담겨 전달
            if (event.data.size > 0) { // 영상의 크기가 0보다 큰지 확인
                chunks.push(event.data);
            }
            console.log(chunks)
        };
        // 녹화가 멈추면 실행되어 녹화된 비디오 Blob 객체를 생성하고 이를 url로 변환
        mediaRecorderRef.current.onstop = () => {
            setSidebarTitle("번역 중...")
            const blob = new Blob(chunks, {type: 'video/webm'});
            const formData = new FormData();
            formData.append('webcamVideo', blob, 'video.mp4'); // Blob : 바이너리 데이터의 묶음을 나타내는 객체 = 녹화된 비디오의 묶음(chunk)을 하나로 묶어줌


            fetch("http://localhost:5000/transelate_image", {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    setSidebarTitle(data.result);
                    // console.log("번역 결과 : ", sidebarTitle)

                })
                .catch(error => {
                    setSidebarTitle("번역 실패");
                    console.log(error)
                })
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    // 녹화 중단
    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    return (
        <>
            <Webcam ref={webcamRef} width={webcamWidth} height={webcamHeight} autoPlay muted/>
            {countdown > 0
                ? <Countdown>{countdown.toString()}초 전</Countdown>
                : (
                    <>
                        <ButtonGroup>
                            <ButtonStyled onClick={startRecording} disabled={isRecording}
                                          className='start'>시작</ButtonStyled>
                            <ButtonStyled onClick={stopRecording} disabled={!isRecording}
                                          className='end'>중지</ButtonStyled>
                        </ButtonGroup>
                        {isRecording && <Recording>녹화중 ...</Recording>}
                        {/*{result && <div>{result}</div>}*/}
                    </>
                )}

        </>
    );
};
const ButtonGroup = styled.div`
  display: flex;
  flex-direaction: row;
  gap: 280px;
`
const ButtonStyled = styled.button`
  border: 1px solid ${(props) => (props.className == 'start' ? 'red' : 'green')};
  background-color: transparent;
  padding: 10px;
  border-radius: 50px;
  font-weight: 700;

  ${(props) => props.disabled && 'border: 1px solid gray;'}
  :hover {
    ${(props) => (props.className == 'start' && (!props.disabled) ? 'background-color:RosyBrown' : 'background-color:none')};
    ${(props) => (props.className == 'end' && (!props.disabled) ? 'background-color:DarkSeaGreen' : 'background-color:none')};
  }
`
const Countdown = styled.div`
  position: relative;
  left: 175px;
  top: 8px;
  font-size: 18px;
  color: #1520a6;
`
const Recording = styled.div`
  position: relative;
  font-size: 18px;
  left: 160px;
  bottom: 30px;
  color: #1520a6;
`

export default WebcamRecorder;