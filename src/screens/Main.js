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
  const { posts, title, word, word1, word2, word3} = props;

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
          <Link underline="hover" color="inherit" href="/">
            {word1}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
          >
            {word2}
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/"
            aria-current="page"
          >
            {word3}
          </Link>
        </Breadcrumbs>
      </Container>
      <Grid item>
      <MainCamera/>
      </Grid>
      
      <Divider orientation="vertical" flexItem>
        {word}
      </Divider>

      <Grid item >
      <video controls style={{ width: '17%', height: 'auto', position: 'absolute', left: '43%', bottom:'10%' }}>
        <source src={process.env.PUBLIC_URL + '/videos/turnOn.mp4'} type="video/mp4" />
      </video>
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;