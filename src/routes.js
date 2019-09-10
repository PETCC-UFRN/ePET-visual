import React from 'react';
import { isAuthenticated } from './services/auth';
import LoginPage from './pages/Loginpage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Home path="/app" component={() => <h1>Você está logado!</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;