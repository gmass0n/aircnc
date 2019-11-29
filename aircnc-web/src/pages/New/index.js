// IMPORT 
import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

// EXPORT
export default function New({history}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    // FUNÇÃO QUE SERA ATIVA ASSIM QUE FOR PRESSIONADO O BOTAO DO FORMULARIO    
    async function handleSubmit(event) {
        // PARA REMOVER O FUNCIONAMENTO PADRAO DO SUBMIT
        event.preventDefault();

        const data = new FormData();
        // RECUPERANDO O 'user_id' ARMAZENADO NO BANCO DE DADOS DO NAVEGADOR
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id },
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            
            <label
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={ thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                type="text"
                id="company"
                placeholder="Nome da sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                type="text"
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                type="text"
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button className="btn">Cadastrar</button>
        </form>
    )
}