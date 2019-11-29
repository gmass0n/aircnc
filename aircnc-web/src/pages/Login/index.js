// IMPORT 
import React, { useState } from 'react';
import api from '../../services/api';

// EXPORT
export default function Login({ history }) {

    const [email, setEmail] = useState('');

    
    // FUNÇÃO QUE SERA ATIVA ASSIM QUE FOR PRESSIONADO O BOTAO DO FORMULARIO
    async function handleSubmit(event) {
        // PARA REMOVER O FUNCIONAMENTO PADRAO DO SUBMIT
        event.preventDefault();
        
        const response = await api.post('/sessions', { email });

        // RECBEBER O ID DO USUARIO DA API
        const { _id } = response.data;

        // ARMAZENAR O ID NO BANCO DE DADOS DO NAVEGADOR
        localStorage.setItem('user', _id);

        // IR PARA A ROTA DASHBOARD 
        history.push('/dashboard');
    }

    // FUNÇÃO ONDE RECEBERA O EVENTO E ATUALIZA O VALOR DO EMAIL COM O VALOR DO EVENTO
    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    return (
        <>  
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para a sua empresa
        </p>

        <form onSubmit={handleSubmit} >
          <label htmlFor="email">E-MAIL *</label>

          <input
            type="email"
            id="email"
            placeholder="Insira seu e-mail"
            value={email}
            onChange={handleEmailChange}
          />

          <button type="submit" className="btn">Entrar</button>

        </form>
        </>
    );
}