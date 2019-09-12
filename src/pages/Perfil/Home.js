import React, { Component } from 'react';

import "./Home.css";

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class Perfil extends Component {

    constructor() {
        super();

        this.state = {
            titulo: '',
            descricao: '',
            local: '',
            dia_inscricao: new Date(),
            ultimo_diainscricao: new Date(),
            qntvagas: 0,
            qntch: 0,
            qntdias: 0,
            valor: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    meusEventos = null;

    noticias = null;

    user = {
        "nome": "Henrique",
        "cpf": "000.000.000-00",
        "email": "henrique@email.com",
        "senha": "123456",
        "tipo_usuario": "petiano",
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="top">
                        <h1>Bem Vindo, {this.user.nome}!</h1>
                    </div>

                    <div className="blocos">
                        <div className="bloco">
                            <h3 className="bloco_title">Meus Eventos</h3>
                            {this.meusEventos ? (
                                <p>
                                    LISTAR EVENTOS
                                </p>
                            ) : (
                                    <p className="noData">Você ainda não participou de nenhum evento!</p>
                                )}
                        </div>

                        <div className="bloco">
                            <h3 className="bloco_title">Notícias</h3>
                            {this.noticias ? (
                                <p>
                                    LISTAR Noticias
                                </p>
                            ) : (
                                    <p className="noData">Nenhuma notícia!</p>
                                )}
                        </div>

                        <div className="bloco">
                            <h3 className="bloco_title">Mais</h3>
                            <p>Solicitar monitoria</p>
                            <p>Meu Perfil</p>
                        </div>

                    </div>
                    <div className="blocos">
                        <div className="bloco">
                            <h3 className="bloco_title">Eventos</h3>
                            {this.meusEventos ? (
                                <p>
                                    LISTAR EVENTOS
                                </p>
                            ) : (
                                    <p className="noData">Nenhum evento disponível!</p>
                                )}
                        </div>
                    </div>


                </div>
            </Router>
        );
    }
}

export default Perfil;