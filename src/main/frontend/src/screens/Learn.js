import React from 'react'
import Grid from '@mui/material/Grid';
import Main from './Main';
import Sidebar from './Sidebar';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState, useEffect } from 'react';
import axios from 'axios';

const word = ['Learn'];
const posts = ['이 장에서는 카테고리별로 새로운 수어를 학습할 수 있습니다. 학습할 때 오른쪽 카메라를 켜고 왼쪽 강의와 사이드에 수형설명을 참고해 따라해 보세요! 자세가 틀렸다면 실시간으로 자세를 교정할 수 있도록 문구가 뜹니다. 이 사항들을 참고해서 재밌게 학습을 진행해 보아요 ~ '];

const sidebar = {
  title: '수형 설명',
  imageLabel: 'Image Text',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
  ],
};

const Learn = (props) => {
  const [categories, setCategories] = useState([]);
  const [signs, setSigns] = useState([]);
  const [sign, setSign] = useState([]);
  const { userId } = props;

  const handleCategoryClick = (categoryId) => {
    const url = `/api/learning/${categoryId}`;
    axios.get(url)
      .then(response => {
        setSigns(response.data);
      })
      .catch(error => {
        console.log('카테고리 단어 배열 요청 에러:', error);
      });
  };

  const handleSignClick = (signId) => {
    const url = `/api/learning/signId/${signId}`;
    axios.get(url)
      .then(response => {
        setSign(response.data);
      })
      .catch(error => {
        console.log('수어 단어 요청 에러', error);
      });
  };

  useEffect(() => {
    axios.get('/api/learning')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log('/api/learning 요청 에러', error);
      });
  }, []);

  const archives = categories.map((category) => ({
      title : category.categoryName,
      id : category.categoryId,
      url : '/api/learning/' + category.categoryId
  }));


  return (
    <Grid container spacing={1} sx={{ mt: 4 }}>
      <Main title="카테고리별 학습하기" posts={posts} word={word} signs={signs} handleSignClick={handleSignClick} sign={sign} userId={userId}/>
      <Sidebar
        title={sidebar.title}
        description={sign.content}
        image={sign.imgPath}
        imageLabel={sidebar.imageLabel}
        archives={archives}
        social={sidebar.social}
        handleCategoryClick={handleCategoryClick} // handleCategoryClick 함수를 Sidebar 컴포넌트에 전달
      />
    </Grid>
  );
};

export default Learn;