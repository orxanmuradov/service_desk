import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

import styles from './Login.module.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { allUsers, login } = useData();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const user = allUsers.find(u => u.username === username && u.password === password);
        if (user) {
            login(user);
            navigate('/');
        } else {
            setError('İstifadəçi adı və ya parol yanlışdır!');
        }
    };

    return (
        <div className={styles.loginBody}>
            <div className={`card shadow-lg p-4 ${styles.card}`}>
                <h2 className={`card-title text-center mb-4 ${styles.cardTitle}`}>Admin Panelə Giriş</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">İstifadəçi Adı / Email</label>
                        <input
                            type="text"
                            className={`form-control ${styles.formControl} ${error ? 'is-invalid' : ''}`}
                            id="username"
                            placeholder="İstifadəçi adınızı daxil edin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Parol</label>
                        <input
                            type="password"
                            className={`form-control ${styles.formControl} ${error ? 'is-invalid' : ''}`}
                            id="password"
                            placeholder="Parolunuzu daxil edin"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">Məni xatırla</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className={`btn btn-primary ${styles.btnPrimary}`}>Giriş</button>
                    </div>
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="text-center mt-3">
                        <a href="#" className={`text-decoration-none ${styles.textDecorationNone}`} onClick={(e) => e.preventDefault()}>Parolu unutdum?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
