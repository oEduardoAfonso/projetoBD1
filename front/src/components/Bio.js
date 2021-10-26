import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Bio(props) {
  return (
    <Card sx={{ width: '100%', boxShadow: 0, padding: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="foto perfil"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.nome}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
