import React, { Component } from 'react';

import "./Perfil.css";

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faArrowCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
        "nome": "Henrique David de Medeiros",
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
                <div className="screen">
                    <i class="fas fa-arrow-circle-left"></i>
                    <div className="info">
                        <FontAwesomeIcon icon={faArrowCircleLeft} color="white" size="2x" className="icone_back" />

                        <p className="name">{this.user.nome}</p>
                        <p className="email">{this.user.email}</p>
                    </div>
                    <div className="paineis">
                        <div>
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


                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Perfil;