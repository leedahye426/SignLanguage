import React, { useState, useRef, useEffect } from 'react'; 
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import TestCamera from './TestCamera';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import Sidebar from './Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import axios from 'axios'

const translate = {
    title: '테스트하기',
    word1 : '졸업',
    word2: '안녕',
    word3: '학교'
}

const sidebar = {
  title: 'Test Start'
};

const side = {
  title: '수형 설명',
  description:
    '테스트를 응시하는 동안은 제공되지 않습니다.',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
  ],
};

const theme = createTheme({
    typography: {
      fontFamily: "'Gowun Dodum', cursive"
    }
  })

const Test = (props) => {
  const [sidebarTitle, setSidebarTitle] = useState(sidebar.title);
  const [categories, setCategories] = useState([]);
  const [signs, setSigns] = useState([]);
  const [sign, setSign] = useState([]);


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
    <Grid container sx={{ mt: 4 }}>
      <Grid container xs={12} md={9} >
        <ThemeProvider theme={theme}>
        <Typography variant="h4" gutterBottom>
          {translate.title}
        </Typography>
        </ThemeProvider>
        <Typography theme = {theme} variant="h6">{translate.posts}</Typography>
        <Divider component="div" role="presentation"/>
        <Container sx={{paddingTop : '20px'}}>
        <Breadcrumbs aria-label="breadcrumb">
          {signs.map((sign) =>
            <Link underline="hover" color="inherit" href="#" key={sign.signId} onClick={() => handleSignClick(sign.signId)} >
              {sign.word}
            </Link>
          )}
          </Breadcrumbs>
        </Container>
        <Grid container flexItem sx={{justifyContent:'center'}}>
          <Grid item>
          <TestCamera setSidebarTitle={setSidebarTitle} sidebarTitle={sidebarTitle} sign={sign} />
          </Grid>

          <Grid item>

          </Grid>
        </Grid>
      </Grid>
      <Sidebar
        title={side.title}
        description={side.description}
        archives={archives}
        social={side.social}
        handleCategoryClick={handleCategoryClick}
      />

    </Grid>

    
  );
};

export default Test;