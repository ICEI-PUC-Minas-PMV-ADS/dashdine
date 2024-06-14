import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dashdine-1hvj.onrender.com',
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name, password, cpf, birthDate, email) => {
  try {
    const response = await api.post('/register', { name, password, cpf, birthDate, email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
