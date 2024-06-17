// api.js

import axios from 'axios';

const baseURL = 'https://dashdine-1hvj.onrender.com'; // URL base da sua API

export const login = async (email, password) => {
  try {
    console.log('Chamando a API de login com:', { email, password });
    const response = await axios.post(`${baseURL}/login/cliente`, {
      entrada: email,
      senha: password,
    });
    console.log('Resposta da API de login:', response.data);
    return response.data; // Retorna os dados da resposta da API (como o token de acesso)
  } catch (error) {
    console.error('Erro na API de login:', error);
    throw error; // Propaga o erro para ser tratado onde a função login for chamada
  }
};




