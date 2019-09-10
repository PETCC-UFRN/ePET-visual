import React, { Component } from 'react';
import '../App.css';

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInForm from './EntrarForm';

class LoginPage extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("Send submit with the following data: ");
        console.log(this.state);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App_logo">
                        <p style={{
                            fontSize: 70, fontWeight: 'bold', marginTop: 250,
                            textAlign: 'right', marginRight: 70, color: 'white'
                        }}>ePET</p>
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
}

export default LoginPage;