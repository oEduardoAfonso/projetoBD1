import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import api from "../services/Api";


export default function Depoimento(props) {
  const [pendente, setPendente] = React.useState(!props.isaceito)
  const [perfilEnviou, setPerfilEnviou] = React.useState('')
  const [conteudo, setConteudo] = React.useState(props.conteudo)
  const [conteudoEditado, setConteudoEditado] = React.useState(props.conteudo)
  const [visible, setVisible] = React.useState(true)
  const [edit, setEdit] = React.useState(false)

  const isAutor = localStorage.getItem('perfil') == props.perfil_enviou
  const isPerfil = localStorage.getItem('perfil') == props.perfil_recebeu

  React.useEffect(() => {
    api.get('/perfil/' + props.perfil_enviou, {}).then(response => setPerfilEnviou(response.data.nome))
  }, [])

  const handleDelete = () => {
    api.delete('/depoimentos/' + props.codigo, {}).then(() => setVisible(false))
  }

  const handleAceita = () => {
    api.put('/depoimentos/' + props.codigo, { isaceito: true }).then(() => setPendente(false))
  }

  const handleEditar = () => {
    setEdit(!edit)
    setConteudoEditado(conteudo)
  }

  const handleChange = event => {
    setConteudoEditado(event.target.value)
  }

  const handleSubmit = () => {
    api.put('/depoimentos/' + props.codigo, { conteudo: conteudoEditado }).then(() => setConteudo(conteudoEditado))
    setEdit(!edit)
  }

  function mostraOpcoes() {
    if (localStorage.getItem('perfil') == props.perfil_recebeu && pendente) {
      return (
        <CardActions disableSpacing>
          <IconButton aria-label="Recusar depoimento" onClick={handleDelete}>
            <ClearIcon />
          </IconButton>
          <IconButton aria-label="Aceitar depoimento" onClick={handleAceita} sx={{ ml: 'auto' }}>
            <CheckIcon />
          </IconButton>
        </CardActions>)
    }
  }

  return (
    <Grid item xs={12}>
      <Card sx={{ margin: 2, bgcolor: '#bdbdbd', height: 'fit-content', display: visible ? true : "none" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={perfilEnviou}
          action={<Box>
            <IconButton color="inherit" onClick={handleEditar} sx={{display: isAutor ? true : "none"}}>
              <CreateIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete} sx={{display: isAutor || isPerfil ? true : "none"}}>
              <DeleteIcon />
            </IconButton>
          </Box>
          }
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ display: edit ? "none" : true }}>
            {conteudo}
          </Typography>
          <Box sx={{ display: edit ? true : "none" }}>
            <TextField
            multiline
            id="depoimento"
            value={conteudoEditado}
            placeholder={conteudo}
            variant="outlined"
            onChange={handleChange}
            sx={{ width: '100%', p: 2 }} />
            <Box sx={{ display: 'flex' }}>
              <IconButton
              color="primary"
              onClick={handleSubmit}
              aria-label="upload picture"
              component="span"
              sx={{ ml: 'auto', mr: 2 }}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
        {mostraOpcoes()}
      </Card>
    </Grid>
  );
}
