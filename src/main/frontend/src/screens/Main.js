import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import MainCamera from './MainCamera';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'Gowun Dodum', cursive"
  }
})


function Main(props) {
  const { posts, title, word, signs, handleSignClick, sign, userId} = props;

  return (
    <Grid container xs={12} md={9} >
      <ThemeProvider theme={theme}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      </ThemeProvider>
      <Typography theme = {theme} variant="h6">{posts}</Typography>
      <Divider component="div" role="presentation"/>
      <Container role="presentation" sx={{paddingTop : '20px'}}>
        <Breadcrumbs aria-label="breadcrumb">
          {signs.map((sign) =>
            <Link underline="hover" color="inherit" href="#" key={sign.signId} onClick={() => handleSignClick(sign.signId)} >
              {sign.word}
            </Link>
          )}
        </Breadcrumbs>
      </Container>
      <Grid item>
      <MainCamera sign={sign} userId={userId}/>
      </Grid>
      <Divider orientation="vertical" flexItem>
        {word}
      </Divider>
      <Grid item key={sign?.signId}>
        {sign && sign.videoPath ? (
            <video controls style={{ width: '280px', height: 'auto', left: '43%', bottom: '10%' }}>
              {sign.videoPath && <source src={`${process.env.PUBLIC_URL}${sign.videoPath}`} type="video/mp4" />}
            </video>
          ) : (
            <p>학습할 수어를 선택하세요.</p>
          )}
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;