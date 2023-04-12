import React from 'react'
import Main from './Main';
import MainFeaturedPost from './MainFeaturedPost'
import Grid from '@mui/material/Grid';
import FeaturedPost from './FeaturedPost';
import Container from '@mui/material/Container';

const mainFeaturedPost = {
  title: '실시간 자세교정 수어 학습',
  description:
    "실시간으로 자세교정을 해줌으로써 수어를 배우고자하는 사용자가 자기주도 학습이 가능하며, 이 서비스를 통해 수어를 학습함으로써 청각장애인과 비장애인 사이 소통의 장애를 현저히 좁힐 수 있을 것으로 예상합니다. ",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: '수어사전으로 바로가기...',
};

const featuredPosts = [
  {
    title: '안녕, 안부',
    date: '오늘의 수어 1',
    description:
      '두 주먹을 쥐고 바닥이 아래로 향하게 하여 가슴 앞에서 아래로 내린다.',
    image: 'img/hi.png',
    imageLabel: 'Image Text',
  },
  {
    title: '고프다,시장,굶다,배고프다',
    date: '오늘의 수어 2',
    description:
      '자연스럽게 편 두 손을 배에 대고 나머지 손가락을 모아대고 누르면서 몸을 약간 구부린다.',
    image: 'img/굶다.png',
    imageLabel: 'Image Text',
  },
];

export default function Home() {
  return (
    <Container>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
    </Container>
  );
};