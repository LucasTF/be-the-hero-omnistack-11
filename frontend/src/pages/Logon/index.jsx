import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import { StyledLogon } from './styles';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const Logon = () => {
    const [id, setId] = useState('');

    const history = useHistory();

    const loginHandler = async event => {
        event.preventDefault();
        await api
            .post('sessions', { id })
            .then(res => {
                console.log(res.data.name);
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', res.data.name);
                history.push('/profile');
            })
            .catch(err => {
                alert('Falha no login. Tente novamente.');
            });
    };

    return (
        <StyledLogon>
            <section>
                <img src={logoImg} alt='Be The Hero' />
                <form onSubmit={loginHandler}>
                    <h1>Faça seu logon</h1>
                    <input
                        type='text'
                        placeholder='Sua ID'
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className='button' type='submit'>
                        Entrar
                    </button>
                    <Link className='back-link' to='/register'>
                        <FiLogIn size={16} color='#e02041' />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt='Heroes' />
        </StyledLogon>
    );
};

export default Logon;
