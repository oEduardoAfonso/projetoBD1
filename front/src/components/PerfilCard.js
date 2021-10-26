import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';


export default function PerfilCard() {

  return (
    <Grid item xs={12} sx={{ ml: 5 }}>
      <Card sx={{ margin: 2, bgcolor: '#bdbdbd', height: 'fit-content', width: 700 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
          action={
            <IconButton aria-label="adicionar amigo" component="span"  sx={{ ml: 'auto', mr: 2 }}>
              <AddIcon />
            </IconButton>}
        />

      </Card>
    </Grid>
  );
}
