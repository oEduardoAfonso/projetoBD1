import * as React from 'react';
import Base from './Base'
import PerfilCard from '../components/PerfilCard'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';


export default function Feed() {
    const { nomePerfil } = useParams();
    function perfis() {
        var posts = []
        for (var aux = 0; aux < 10; aux++)
            posts.push(<PerfilCard />)
        return posts
    }

    const publicar = () => {
        console.log('publicado')
    }

    return <Base>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
                Resultados da busca "{nomePerfil}"
            </Typography>
        </Box>
        {perfis()}
    </Base>
}