import React from 'react'
import Grid from '@mui/material/Grid';
import Main from './Main';
import Sidebar from './Sidebar';
import GitHubIcon from '@mui/icons-material/GitHub';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';


const posts = ['Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo여기까지 quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.'];

const sidebar = {
  title: '수형 설명',
  description:
    '두 주먹을 쥐고 바닥이 아래로 향하게 하여 가슴 앞에서 아래로 내린다.',
  image : 'img/hi.png',
  imageLabel: 'Image Text',
    archives: [
    { title: 'March', url: '/:1' },
    { title: 'February', url: '#' },
    { title: 'January', url: '#' },
    { title: 'November', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
  ],
};

const Learn = () => {
  return (
    <Grid container spacing={5} sx={{ mt: 4 }}>
      <Main title="카테고리별 학습하기" posts={posts}/>
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