import React, { useState, useRef, useEffect } from 'react'; 
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import AiCamera from './AiCamera';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
const translate = {
    title: '수어 번역기',
    posts: '이 장은 모르는 수어를 보여주면 그 수어가 무슨 의미인지 알려주는 번역기 페이지 입니다. 모르는 수어를 카메라를 켠 채로 동작을 하면 번역기를 통해 검색이 되서 학습자의 자세를 파악해 정확한 뜻을 알려줍니다. \n 이 단어를 학습하고 싶다면 학습하기 페이지를 참고해 주세요! ',
    word: 'Translate'
}

const sidebar = {
    title: 'start'
  };

const theme = createTheme({
    typography: {
      fontFamily: "'Gowun Dodum', cursive"
    }
  })

const Test = () => {
  const [sidebarTitle, setSidebarTitle] = useState(sidebar.title);
  
  return (
    <Grid container sx={{ mt: 4 }}>
      <ThemeProvider theme={theme}>
      <Typography variant="h4" gutterBottom>
        {translate.title}
      </Typography>
      </ThemeProvider>
      <Typography theme = {theme} variant="h6">{translate.posts}</Typography>
      <Container sx={{paddingTop : '20px'}}/>
      <Grid container flexItem sx={{justifyContent:'center'}}>
        <Grid item ><AiCamera setSidebarTitle={setSidebarTitle} sidebarTitle={sidebarTitle} /></Grid>
        <Divider orientation="vertical" flexItem sx={{margin:'0 30px 0'}}>
          {translate.word}
        </Divider>
        <Grid item>
        <Paper elevation={0} sx={{ p: 2, width: '500px', bgcolor: 'grey.200', marginTop : '160px', paddingLeft:'25px'}}>
        <Typography variant="h6" gutterBottom>
          {sidebarTitle}
        </Typography>
        </Paper>
        </Grid>
      </Grid>
    </Grid>
    
  );
};

export default Test;