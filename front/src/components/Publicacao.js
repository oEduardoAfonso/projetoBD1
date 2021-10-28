import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import api from "../services/Api";

export default function Publicacao(props) {
  const [conteudo, setConteudo] = React.useState(props.conteudo)
  const [conteudoEditado, setConteudoEditado] = React.useState(props.conteudo)
  const [visible, setVisible] = React.useState(true)
  const [edit, setEdit] = React.useState(false)

  const isAutor = localStorage.getItem('perfil') == props.autor

  const handleDelete = () => {
    api.delete('/publicacoes/' + props.codigo, {}).then(() => setVisible(false))
  }

  const handleEditar = () => {
    setEdit(!edit)
    setConteudoEditado(conteudo)
  }

  const handleChange = event => {
    setConteudoEditado(event.target.value)
  }

  const handleSubmit = () => {
    api.put('/publicacoes/' + props.codigo, { conteudo: conteudoEditado }).then(() => setConteudo(conteudoEditado))
    setEdit(!edit)
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
          title={props.nome}
          subheader={new Date(props.data).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          action={<Box sx={{display: isAutor ? true : "none"}}>
            <IconButton color="inherit" onClick={handleEditar}>
              <CreateIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
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
            id="publicacao"
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
      </Card>
    </Grid>
  );
}
