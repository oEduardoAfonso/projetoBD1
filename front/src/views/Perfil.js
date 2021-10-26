import * as React from 'react';
import Base from './Base'
import Depoimento from '../components/Depoimento'
import Publicacao from '../components/Publicacao'
import Bio from '../components/Bio'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Feed() {

    function posts() {
        var posts = []
        for (var aux = 0; aux < 5; aux++){
            posts.push(<Depoimento />)
            posts.push(<Publicacao />)
        }
        return posts
    }

    const seguir = () => {
        console.log('seguindo')
    }

    return <Base>

        <Box>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Bio />
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Button variant="outlined" onClick={seguir}>SEGUIR</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
                PUBLICAÇÕES E DEPOIMENTOS
            </Typography>
        </Box>
        {posts()}
    </Base>
}