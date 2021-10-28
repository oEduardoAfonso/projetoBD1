import * as React from 'react';
import Base from './Base'
import PerfilCard from '../components/PerfilCard'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import api from "../services/Api";

export default function Feed() {
    const { nomePerfil } = useParams();
    const [resultados, setResultados] = React.useState(null);
    const [perfis, setPerfis] = React.useState([]);

    React.useEffect(() => {
        api.get('/perfis/' + nomePerfil, {}).then(response => {
            setResultados(response.data)
        })
    }, [nomePerfil])

    React.useEffect(() => {
        setPerfis([])
        if (resultados) {
            resultados.map(usuario => {
                if (usuario.usuario != localStorage.getItem('perfil'))
                    setPerfis(perfis =>
                        [...perfis,
                        <PerfilCard
                            perfil={usuario.perfil}
                            nome={usuario.nome}
                        />])
            })
        }
    }, [resultados])

    return <Base>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
                Resultados da busca "{nomePerfil}"
            </Typography>
        </Box>
        {perfis}
    </Base>
}