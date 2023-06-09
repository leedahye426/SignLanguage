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

const theme = createTheme({
    typography: {
      fontFamily: "'Gowun Dodum', cursive"
    }
  })

const Test = () => {
  const [sidebarTitle, setSidebarTitle] = useState(sidebar.title);
  
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
            <Link underline="hover" color="inherit" href="/">
              {translate.word1}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
            >
              {translate.word2}
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/"
              aria-current="page"
            >
              {translate.word3}
            </Link>
          </Breadcrumbs>
        </Container>
        <Grid container flexItem sx={{justifyContent:'center'}}>
          <Grid item ><TestCamera setSidebarTitle={setSidebarTitle} sidebarTitle={sidebarTitle} /></Grid>

          <Grid item>
          <Paper elevation={0} sx={{ p: 2, width: '500px', bgcolor: 'grey.200', marginTop : '20px', paddingLeft:'25px'}}>
          <Typography variant="h6" gutterBottom>
            {sidebarTitle}
          </Typography>
          </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Sidebar
        title={side.title}
        description={side.description}
        archives={side.archives}
        social={side.social}
      />

    </Grid>
    
    
  );
};

export default Test;