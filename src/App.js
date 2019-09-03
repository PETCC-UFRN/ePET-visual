import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpForm from './pages/SignUpForm.js';

import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignInForm from './pages/EntrarForm';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="App_logo">
          <p style={{ fontSize: 100, fontWeight: 'lighter', marginTop: 200, 
          textAlign: 'right', marginRight: 70, color: 'white' }}>e-PET</p>
        </div>
        <div className="App_Form">
          <div className="PageSwitcher">
            <NavLink to="/entrar" activeClassName="PageSwitcher_Item--Active"
            className="PageSwitcher_Item">Entrar</NavLink>
            <NavLink exact to="/" activeClassName="PageSwitcher_Item--Active"
            className="PageSwitcher_Item">Cadastrar</NavLink>
          </div>

          <Route exact path="/" component={SignUpForm}>
          </Route>
          <Route path="/entrar" component={SignInForm}>
          </Route>

          

        </div>
      </div>
    </Router>
  );
}

export default App;
