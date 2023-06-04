import React from 'react'
import Grid from '@mui/material/Grid';
import Main from './Main';
import Sidebar from './Sidebar';
import GitHubIcon from '@mui/icons-material/GitHub';

const word = ['Learn'];
const words = {
  words1 : '졸업',
  words2 : '안녕',
  words3 : '학교',
}

const posts = ['이 장에서는 카테고리별로 새로운 수어를 학습할 수 있습니다. 학습할 때 오른쪽 카메라를 켜고 왼쪽 강의와 사이드에 수형설명을 참고해 따라해 보세요! 자세가 틀렸다면 실시간으로 자세를 교정할 수 있도록 문구가 뜹니다. 이 사항들을 참고해서 재밌게 학습을 진행해 보아요 ~ '];

const sidebar = {
  title: '수형 설명',
  description:
    '두 주먹을 쥐고 바닥이 아래로 향하게 하여 가슴 앞에서 아래로 내린다.',
  image : 'img/hi.png',
  imageLabel: 'Image Text',
    archives: [
    { title: 'March', url: '/learn/1' },
    { title: 'February', url: '/learn/2' },
    { title: 'January', url: '#' },
    { title: 'November', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
  ],
};

const Learn = () => {
  return (
    <Grid container spacing={1} sx={{ mt: 4 }}>
      <Main title="카테고리별 학습하기" posts={posts} word={word} word1={words.words1} word2={words.words2} word3={words.words3} />
      <Sidebar
        title={sidebar.title}
        description={sidebar.description}
        image={sidebar.image}
        imageLabel={sidebar.imageLabel}
        archives={sidebar.archives}
        social={sidebar.social}
      />
    </Grid>
  );
};

export default Learn;