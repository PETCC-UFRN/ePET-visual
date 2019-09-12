import React, { Component } from 'react';

import "./ListarEventos.css";

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



class ListarEventos extends Component {

    constructor() {
        super();

        this.state = {
        }

    }

    lista = [
        {
            'titulo': 'Festa do PET',
            'descricao': 'AAAAAAAAAAAAAAAAAAA',
            'local': 'DIMAP',
            'diaInscricao': '01/01/2019',
            'ultimoDiaInscricao': '02/01/2019',
            'qntVagas': 12,
            'qntCH': 4,
            'qntDias': 4,
            'valor': 2.00,
            'status': true
        },
        {
            'titulo': 'Festa do PET 2',
            'descricao': 'BBBBBBBBB',
            'local': 'IMD',
            'diaInscricao': '01/02/2019',
            'ultimoDiaInscricao': '02/02/2019',
            'qntVagas': 12,
            'qntCH': 4,
            'qntDias': 4,
            'valor': 2.00,
            'status': true
        }
    ];

    render() {
        return (
            <Router>
                <div>
                    <div className="top">
                        <h1>Eventos</h1>
                    </div>

                    <div>
                        {this.lista.map((item, index) => (
                            <div className="item">
                                <div>
                                    <p className="itemTitle">{item.titulo}</p>
                                    <br />
                                    <div>
                                        <p className="itemInfo">Local: {item.local} - Inscrições: {item.diaInscricao} - {item.ultimoDiaInscricao} | {item.status ? (
                                        <p className="status_">Disponível</p>) : (null)}</p>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Router>
        );
    }
}

export default ListarEventos;