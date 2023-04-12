import React from 'react'
import Grid from '@mui/material/Grid';
import Main from './Main';
import Sidebar from './Sidebar';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';


const posts = [post1, post2, post3];

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
    { title: 'October', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const Learn = () => {
  return (
    <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="카테고리별 학습하기"/>
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