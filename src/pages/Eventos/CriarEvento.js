import React, { Component } from 'react';

import "./CriarEvento.css";

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CriarEvento extends Component {

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
                        <h1>Cadastrar Evento</h1>
                        <p>Insira os dados solicitados abaixo</p>
                    </div>

                    <div className="form_">
                    <form>
                        <label className="item">
                            Titulo:
                            <br />
                            <input type="text" name="titulo" onChange={this.handleInputChange} className="item_input" />
                        </label>
                        <br />

                        <label className="item">
                            Descrição:
                            <br />
                            <input type="text" name="descricao" onChange={this.handleInputChange} className="item_input" />
                        </label>
                        <br />
                        <label className="item">
                            Local:
                            <br />
                            <input type="text" name="local" onChange={this.handleInputChange} className="item_input" />
                        </label>
                        <br />

                        <label className="item">
                            Dia da Inscrição:
                            <DatePicker selected={this.state.dia_inscricao} onChange={date => this.setState({ dia_inscricao: date })} className="item_input_date" />
                        </label>
                        <label>
                            Último dia de Inscrição:
                            <DatePicker selected={this.state.ultimo_diainscricao} onChange={date => this.setState({ ultimo_diainscricao: date })} className="item_input_date" />
                        </label>
                        <br />
                        <label className="item">
                            Quantidade de vagas:
                            <br />
                            <input type="number" name="qntvagas" onChange={this.handleInputChange} className="item_input" />
                        </label>
                        <br />
                        <label className="item">
                            Quantidade de carga horária:
                            <br />
                            <input type="number" name="qntch" onChange={this.handleInputChange} className="item_input" />
                        </label>
                        <br />
                        <label className="item">
                            Quantidade de Dias:<br />
                            <input type="number" name="qntdias" onChange={this.handleInputChange} className="item_input" />
                        </label>
                        <br />
                        <label className="item">
                            Valor:<br />
                            <input type="number" name="valor" onChange={this.handleInputChange} className="item_input" />
                        </label>
                        <br />

                        <div className="buttons_div">
                            <input type="submit" value="Cancelar" className="item_button" />
                            <input type="submit" value="Criar" className="item_button" />
                        </div>

                    </form>
                    </div>
                </div>
            </Router>
        );
    }
}

export default CriarEvento;