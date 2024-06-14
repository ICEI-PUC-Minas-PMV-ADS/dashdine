import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      // Aqui você pode carregar o usuário do armazenamento local, se necessário
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginService(email, password);
      setUser(userData);
      // Armazene userData no armazenamento local, se necessário
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const register = async (name, password, cpf, birthDate, email) => {
    try {
      const userData = await registerService(name, password, cpf, birthDate, email);
      setUser(userData);
      // Armazene userData no armazenamento local, se necessário
    } catch (error) {
      console.error('Register error', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    // Remova userData do armazenamento local, se necessário
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
