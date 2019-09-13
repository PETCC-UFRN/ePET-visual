import React from 'react';
import { isAuthenticated } from './services/auth';
import LoginPage from './pages/Loginpage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CriarEvento from './pages/Eventos/CriarEvento';
import ListarEventos from './pages/Eventos/ListarEventos';
import Perfil from './pages/Perfil/Perfil';
import HomeUser from './pages/Perfil/HomeUser';

const Home = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )} />
);



function Login(){
    return <LoginPage />;
}

function criarEvento(){
    return <CriarEvento />;
}

function listarEventos(){
    return <ListarEventos />;
}

function perfilComp(){
    return <Perfil />;
}

function homeComp(){
    return <HomeUser />
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={homeComp} />
            <Home path="/app" component={() => <h1>Você está logado!</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;