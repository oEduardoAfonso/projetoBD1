import * as React from 'react';
import Base from './Base'
import Publicacao from '../components/Publicacao'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import api from "../services/Api";


export default function Feed() {
    const [perfil, setPerfil] = React.useState(null);
    const [conteudo, setConteudo] = React.useState('');
    const [publicacoes, setPublicacoes] = React.useState([]);
    const [update, setUpdate] = React.useState(false);

    React.useEffect(() => {
        api.get('/perfil/' + localStorage.getItem('perfil'), {}).then(response => {
            setPerfil(response.data)
            setPublicacoes([])
            response.data.amigos_perfil1_fkey_perfil.push(response.data.usuario)
            response.data.amigos_perfil1_fkey_perfil.map(amigo => {
                api.get('publicacoes/perfil/' + amigo, {}).then(response => {
                    response.data.map(publicacao => {
                        if (publicacao.codigo_comunidade == null) {
                            async function getNome() {
                                const resposta = api.get('/perfil/' + amigo, {}).then(response => response.data.nome)
                                publicacao.nome = await resposta
                                setPublicacoes(publicacoes => [...publicacoes, publicacao])
                            }
                            getNome()
                        }
                    })
                })
            })
        })
    }, [update])

    function showPublicacoes() {
        var posts = []

        posts = publicacoes.sort((a, b) => {
            return a.data_hora < b.data_hora ? 1 : -1
        })

        const publi = posts.map(post => {
            return <Publicacao
                nome={post.nome}
                codigo={post.codigo}
                data={post.data_hora}
                autor={post.autor}
                conteudo={post.conteudo}
                curtidas={post.curtida_codigo_publicacao_fkey_perfil.length}
            />
        })

        return publi
    }

    const handleChange = event => {
        setConteudo(event.target.value)
    }

    const publicar = () => {
        const post = {
            conteudo: conteudo,
            codigo_comunidade: null,
            autor: perfil.usuario
        }
        api.post('/publicacoes', post).then(() => {
            api.get('/perfil/' + perfil.usuario, {}).then(response => setPerfil(response.data))
            setConteudo('')
            setUpdate(!update)
        })
    }

    return <Base>
        <TextField multiline id="publicacao" value={conteudo} onChange={handleChange} placeholder="Sobre o que você está pensando?" variant="outlined" sx={{ width: '100%', p: 2 }} />
        <Box sx={{ display: 'flex' }}>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={publicar} sx={{ ml: 'auto', mr: 2 }}>
                <SendIcon />
            </IconButton>
        </Box>
        {showPublicacoes()}
    </Base>
}