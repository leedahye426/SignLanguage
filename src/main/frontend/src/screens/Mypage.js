import React from 'react'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ProgressBar from './ProgressBar';
import { Container } from '@mui/system';
import { fetchSession } from '../sessionApi';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:8080/api/mypage')
      .then(response => {
        const data = response.data;
        console.log('data:',data);

        const updatedCategories = data.map(item => {
          const category = item.category;
          const categoryName = category.categoryName;
          const signs = item.signs;

          console.log(categoryName);
          console.log(signs);

          return {
            category: category,
            signs: signs
          };

        })
        setCategories(updatedCategories);

      })
      .catch(error => {
        console.log('mypage 정보 요청 실패 : ', error);
      })
  }, []);


  const sessionExist = (sessionInfo) => {
    console.log('sessionExist 실행');
    setUserInfo(sessionInfo);
  }

  return (
    <Container>
        <Card sx={{ justifyItems:'center' }}>
            <CardContent sx={{ textAlign:'center'}}>
                <Typography component="h2" variant="h5" sx={{mb:1, mt:1}}>
                학습자 : {userInfo.name}
                </Typography>
                <Typography variant="subtitle1">
                {userInfo.email}
                </Typography>
            </CardContent>
        </Card>

        {categories.map((category, index) => (
          <Card key={index} sx={{ display: 'flex', my: 3.5 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                카테고리 : {category.category.categoryName}
              </Typography>
              <Typography variant="subtitle1" >
                {category.signs.map((sign, index) => (
                  <li key={index}>{sign.word}</li>
                ))}
              </Typography>
              <ProgressBar categoryId={category.category.categoryId} userId={userInfo.memberId} />
            </CardContent>
          </Card>
        ))}


    </Container>
  )
}

export default Mypage