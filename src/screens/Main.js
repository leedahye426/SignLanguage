import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import Camera from './Camera';
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
  const { posts, title } = props;

  return (
    <Grid container xs={12} md={9} >
      <ThemeProvider theme={theme}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      </ThemeProvider>
      {posts}
      <Divider component="div" role="presentation"/>
      <Container role="presentation" sx={{paddingTop : '20px'}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
          >
            Core
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/"
            aria-current="page"
          >
            Breadcrumbs
          </Link>
        </Breadcrumbs>
      </Container>
      <Grid item>
        <Camera/>
      </Grid>
      <Divider orientation="vertical" flexItem>
        VERTICAL
      </Divider>
      <Grid item></Grid>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;