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
import api from "../services/Api";


export default function Depoimento(props) {
  const [pendente, setPendente] = React.useState('true')
  const [perfilEnviou, setPerfilEnviou] = React.useState('')

  React.useEffect(() => {
    api.get('/perfis/' + props.perfil_enviou, {}).then(response => setPerfilEnviou(response.data.nome))
  }, [])

  function mostraOpcoes() {
    if (localStorage.getItem('perfil') == props.perfil_recebeu && pendente) {
      return (
        <CardActions disableSpacing>
          <IconButton aria-label="Recusar depoimento">
            <ClearIcon />
          </IconButton>
          <IconButton aria-label="Aceitar depoimento" sx={{ ml: 'auto' }}>
            <CheckIcon />
          </IconButton>
        </CardActions>)
    }
  }

  return (
    <Grid item xs={12}>
      <Card sx={{ margin: 2, bgcolor: '#bdbdbd', height: 'fit-content' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={perfilEnviou}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.conteudo}
          </Typography>
        </CardContent>
        {mostraOpcoes()}
      </Card>
    </Grid>
  );
}
