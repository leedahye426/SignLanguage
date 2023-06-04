import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './screens/Home';
import Learn from './screens/Learn';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Test from './screens/Test';
import Header from './screens/Header';
import Container from '@mui/material/Container';
import Today from './screens/Today';
import Translate from "./screens/Translate";
import Mypage from './screens/Mypage';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { fetchSession } from './sessionApi';
const sections = [
  { title: '수어 번역기', url: '/Translate' },
  { title: '카테고리별 학습하기', url: '/Learn' },
  { title: '테스트하기', url: '/Test' },
];


function App() {

  const [userInfo, setUserInfo] = useState('');

  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
        // 서버로부터 세션 ID를 요청
    axios.get('http://localhost:8080/api/sessionId')
      .then(response => {

        setSessionId(response.data);
        console.log('요청 헤더에 포함된 sessionId:', sessionId);
      })
      .catch(error => {
        console.error('세션 ID 요청 실패:', error);
      });

    fetchSession(sessionId)
      .then((sessionInfo) => {
         console.log('세션 요청 ');
         console.log('sessionInfo:', sessionInfo);
         sessionExist(sessionInfo);
      })
      .catch((error) => {
         console.error('세션 정보 요청 실패', error.response.data);
      });
  }, []);

  const handleLoginSuccess = (sessionInfo) => {
    // 세션 정보를 받아와서 처리하는 로직을 작성합니다.
    console.log('handleLoginSuccess 실행');
    setUserInfo(sessionInfo);
  };

  const sessionExist = (sessionInfo) => {
    console.log('sessionExist 실행');
    setUserInfo(sessionInfo);
  }
  return (
    <Router>
      <Container maxWidth="lg">
      <Header title="수어지교" sections={sections} user={userInfo}/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/Learn" element={<Learn userId={userInfo.memberId} />} />
        <Route path="/Learn/:1" element={<Learn/>} />
        <Route path="/Translate" element={<Translate/>} />
        <Route path="/SignIn" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/SignUp" element = {<SignUp/>} />
        <Route path="/Test" element = {<Test/>} />
        <Route path="/Mypage" element = {<Mypage/>} />
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
