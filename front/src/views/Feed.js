import * as React from 'react';
import Base from './Base'
import Publicacao from '../components/Publicacao'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';


export default function Feed() {

    function postagens() {
        var posts = []
        for (var aux = 0; aux < 10; aux++)
            posts.push(<Publicacao />)
        return posts
    }

    const publicar = () => {
        console.log('publicado')
    }

    return <Base>
        <TextField multiline id="publicacao" placeholder="Sobre o que você está pensando?" variant="outlined" sx={{ width: '100%', p: 2 }} />
        <Box sx={{display: 'flex'}}>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={publicar} sx={{ ml: 'auto', mr: 2 }}>
                <SendIcon />
            </IconButton>
        </Box>
        {postagens()}
    </Base>
}