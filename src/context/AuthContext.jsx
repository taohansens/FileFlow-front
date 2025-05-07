import { createContext, useContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (user && savedToken) {
      setCurrentUser(JSON.parse(user));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const userLogin = async (email, password) => {
    const { token, email: userEmail } = await login(email, password);
    const user = { email: userEmail };
    setCurrentUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    return user;
  };

  const userRegister = async (name, email, password) => {
    const user = await register(name, email, password);
    return user;
  };

  const userLogout = () => {
    logout();
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    token,
    login: userLogin,
    register: userRegister,
    logout: userLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}