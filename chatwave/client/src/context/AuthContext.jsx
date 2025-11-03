import React, { createContext, useContext, useState, useEffect} from 'react'
import API from '../utils/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password});
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const register = async (name, email, password) => {
        await API.post('/auth/register', {name, email, password});
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await API.get('/auth/me');
            setUser(res.data);

        } catch {
            localStorage.removeItem('token')
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) fetchCurrentUser();
    }, [])
  return (
    <AuthContext.Provider value={{ user, login, register, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);