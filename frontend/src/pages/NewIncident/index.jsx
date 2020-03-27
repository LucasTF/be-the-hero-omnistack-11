import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { StyledIncident } from './styles';

const NewIncident = () => {
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const newIncidentHandler = async event => {
        event.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        await api
            .post('incidents', data, {
                headers: {
                    Authorization: ongId,
                },
            })
            .then(res => {
                history.push('/profile');
            })
            .catch(err => {
                alert('Erro ao cadastrar caso. Tente novamente.');
            });
    };

    return (
        <StyledIncident>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero' />
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói
                        para resolver isso.
                    </p>
                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#e02041' />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={newIncidentHandler}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Título do caso'
                        type='text'
                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Descrição'
                    />
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Valor em reais'
                        type='text'
                    />
                    <button className='button' type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </StyledIncident>
    );
};

export default NewIncident;
