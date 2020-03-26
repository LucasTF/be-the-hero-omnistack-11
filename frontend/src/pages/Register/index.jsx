import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    const registerHandler = async event => {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        await api
            .post('ongs', data)
            .then(res => {
                alert(`Seu ID de acesso: ${res.data.id}`);
                history.push('/');
            })
            .catch(err => {
                alert('Erro no cadastro. Tente novamente!');
            });
    };

    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero' />
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a
                        encontrarem os casos da sua ONG.
                    </p>
                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#e02041' />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={registerHandler}>
                    <input
                        placeholder='Nome da ONG'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder='E-mail'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder='Whatsapp'
                        type='text'
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className='input-group'>
                        <input
                            placeholder='Cidade'
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder='UF'
                            type='text'
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className='button' type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
