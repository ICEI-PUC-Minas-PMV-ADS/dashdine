// api.js

import axios from 'axios';

const baseURL = 'https://dashdine-1hvj.onrender.com'; // URL base da sua API

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/login/cliente`, {
      entrada: email,
      senha: password,
    });
    return response.data; // Retorna os dados da resposta da API (como o token de acesso)
  } catch (error) {
    throw error; // Propaga o erro para ser tratado onde a função login for chamada
  }
};



