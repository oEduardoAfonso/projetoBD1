import * as React from 'react';
import Base from './Base'
import Depoimento from '../components/Depoimento'
import Publicacao from '../components/Publicacao'
import Bio from '../components/Bio'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import api from "../services/Api";

export default function Feed() {
    const { nomePerfil } = useParams();
    const [perfil, setPerfil] = React.useState(null);
    const [depoimentos, setDepoimentos] = React.useState();
    const [publicacoes, setPublicacoes] = React.useState();
    const [showPublicaoes, setShowPublicacoes] = React.useState(true);

    React.useEffect(() => {
        api.get('/perfil/' + nomePerfil, {}).then(response => { setPerfil(response.data) })
        api.get('/depoimentos/perfil/' + nomePerfil, {}).then(response => { setDepoimentos(response.data) })
        api.get('/publicacoes/perfil/' + nomePerfil, {}).then(response => { setPublicacoes(response.data) })
    }, [])

    function showDepoimentos() {
        var posts = []

        if (depoimentos) {
            depoimentos.forEach(depoimento => {
                posts.push(depoimento)
            });
        }

        posts = posts.sort((a, b) => {
            return a.codigo < b.codigo ? 1 : -1
        })

        const publi = posts.map(post => {
            return <Depoimento
                perfil_enviou={post.perfil_enviou}
                perfil_recebeu={post.perfil_recebeu}
                conteudo={post.conteudo}
            />
        })

        return publi
    }

    function showPublicacoes() {
        var posts = []

        if (publicacoes) {
            publicacoes.forEach(publicacao => {
                if (publicacao.codigo_comunidade == null)
                    posts.push(publicacao)

            });
        }

        posts = posts.sort((a, b) => {
            return a.data_hora < b.data_hora ? 1 : -1
        })

        const publi = posts.map(post => {
            return <Publicacao
                nome={perfil.nome}
                data={post.data_hora}
                conteudo={post.conteudo}
                curtidas={post.curtida_codigo_publicacao_fkey_perfil.length}
            />
        })

        return publi
    }


    const seguir = () => {
        console.log(perfil)
    }

    return <Base>

        <Box>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Bio nome={perfil ? perfil.nome : null} />
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        {perfil && true ? `${perfil.amigos_perfil2_fkey_perfil.length} seguidores` : <Button variant="outlined" onClick={seguir}>SEGUIR</Button>}

                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, width: 800 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Button color="inherit" onClick={() => setShowPublicacoes(true)}>Publicações</Button>
                    <Button color="inherit" onClick={() => setShowPublicacoes(false)}>Depoimentos</Button>
                </Toolbar>
            </AppBar>
        </Box>
        {perfil && showPublicaoes ? showPublicacoes() : showDepoimentos()}
    </Base>
}