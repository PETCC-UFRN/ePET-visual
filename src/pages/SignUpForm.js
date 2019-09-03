import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SignUpForm extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
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
            <div>
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="name">Nome Completo</label>
                            <input type="text" id="name" className="FormField__Input" 
                            placeholder="Insira seu nome completo" name="name" value={this.state.name} 
                            onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Email</label>
                            <input type="email" id="email" className="FormField__Input"
                            placeholder="Insira seu email" name="email" value={this.state.email}
                            onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Senha</label>
                            <input type="password" id="password" className="FormField__Input" 
                            placeholder="Digite uma senha" name="password" value={this.state.password}
                            onChange={this.handleChange} />
                        </div>


                        <div className="FormField">
                            <button className="FormField__Button mr-20">Cadastrar</button>
                            <Link to="/entrar" className="FormField__Link">Já possuo uma conta.</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpForm;