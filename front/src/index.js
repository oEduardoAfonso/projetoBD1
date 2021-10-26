import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes/routes'


ReactDOM.render(
  <React.StrictMode>
      <CssBaseline />
      <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);