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


export default function Publicacao(props) {

  return (
    <Grid item xs={12}>
      <Card sx={{ margin: 2, bgcolor: '#bdbdbd', height: 'fit-content' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={props.nome}
          subheader={new Date(props.data).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          action={<Box>
            <IconButton color="inherit" >
              <CreateIcon />
            </IconButton>
            <IconButton color="error" >
              <DeleteIcon />
            </IconButton>
          </Box>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.conteudo}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" sx={{ ml: 'auto' }}>
            <FavoriteIcon />
            {props.curtidas}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
