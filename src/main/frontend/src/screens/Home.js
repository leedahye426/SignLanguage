import React from 'react'
import Main from './Main';
import MainFeaturedPost from './MainFeaturedPost'
import Grid from '@mui/material/Grid';
import FeaturedPost from './FeaturedPost';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const mainFeaturedPost = {
  title: '실시간 자세교정 수어 학습',
  description:
    "실시간으로 자세교정을 해줌으로써 수어를 배우고자하는 사용자가 자기주도 학습이 가능하며, 이 서비스를 통해 수어를 학습함으로써 청각장애인과 비장애인 사이 소통의 장애를 현저히 좁힐 수 있을 것으로 예상합니다. ",
  image: 'img/main.jpg',
  imageText: 'main image description',
  linkText: '수어사전으로 바로가기...',
};


export default function Home() {
  const [todaySigns, setTodaySigns] = useState([]);

  useEffect(() => {
    axios.get('/api/home')
      .then(response => {
        setTodaySigns(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayString = `${year}-${month}-${day}`;

  const featuredPosts = todaySigns.map((sign) => ({
    id : sign.singId,
    title : sign.word,
    date : todayString,
    description : sign.content,
    image : sign.imgPath,
    imageLabel : 'Image Text',
  }));
  return (
    <Container>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.signId} post={post} />
        ))}
      </Grid>
    </Container>
  );
};