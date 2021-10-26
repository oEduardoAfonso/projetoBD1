import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import React from 'react'
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Feed from '../views/Feed';
import Perfil from '../views/Perfil';
import Busca from '../views/Busca';
import Cadastro from '../views/Cadastro';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Inicio} />
            <Route path="/login" exact component={Login} />
            <Route path="/cadastro" exact component={Cadastro} />
            <Route path="/home" component={Feed} />
            <Route path="/perfil/:nomePerfil" component={Perfil} />
            <Route path="/busca/:nomePerfil" component={Busca} />
        </Switch>
    </Router>
);

export default Routes;