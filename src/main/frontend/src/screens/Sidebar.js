import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {CardMedia} from '@mui/material';
import axios from 'axios';
import {useState} from 'react';

function Sidebar(props) {
    const {archives, description, social, title, image, imageLabel, handleCategoryClick} = props;
    const [signs, setSigns] = React.useState([]);

    return (
        <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{p: 2, bgcolor: 'grey.200'}}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                {description ? (
                    <Typography>{description}</Typography>
                ) : (
                    <Typography>학습할 수어를 선택하세요.</Typography>
                )}
                {image ? (
                    <CardMedia
                        component="img"
                        sx={{width: 180, display: {xs: 'none', sm: 'block'}}}
                        image={image}
                        alt={imageLabel}
                    />
                ) : null}
            </Paper>
            <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                Category
            </Typography>
            {archives.map((archive) => (
                <Link display="block" variant="body1" href="#" key={archive.id}
                      onClick={() => handleCategoryClick(archive.id)}>
                    {archive.title}
                </Link>
            ))}

            <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                Social
            </Typography>
            {social.map((network) => (
                <Link
                    display="block"
                    variant="body1"
                    href="#"
                    key={network.name}
                    sx={{mb: 0.5}}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <network.icon/>
                        <span>{network.name}</span>
                    </Stack>
                </Link>
            ))}

        </Grid>
    );
}

Sidebar.propTypes = {
    archives: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    description: PropTypes.string.isRequired,
    social: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.elementType.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Sidebar;