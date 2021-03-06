import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { StyledProfile } from './styles';

const Profile = () => {
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            },
        }).then(res => {
            setIncidents(res.data);
        });
    }, [ongId]);

    const deleteIncidentHandler = async id => {
        await api
            .delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                },
            })
            .then(res => {
                setIncidents(incidents.filter(incident => incident.id !== id));
            })
            .catch(err => {
                alert('Erro ao tentar deletar incidente. Tente novamente.');
            });
    };

    const logoutHandler = () => {
        localStorage.clear();
        history.push('/');
    };

    return (
        <StyledProfile>
            <header>
                <img src={logoImg} alt='Be the Hero' />
                <span>Bem vinda, {ongName}</span>
                <Link className='button' to='/incidents/new'>
                    Cadastrar novo caso
                </Link>
                <button onClick={logoutHandler} type='button'>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(incident.value)}
                        </p>
                        <button
                            onClick={() => deleteIncidentHandler(incident.id)}
                        >
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </StyledProfile>
    );
};

export default Profile;
