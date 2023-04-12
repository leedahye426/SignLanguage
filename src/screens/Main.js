import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import Camera from './Camera';
import { ButtonGroup, Button} from '@mui/material';

function Main(props) {
  const { title } = props;

  return (
    <Grid item xs={12} md={8} >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider component="div" role="presentation"/>
      <ButtonGroup variant="text" aria-label="text button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      <Camera/>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;