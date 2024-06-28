import React, { useState, useEffect } from 'react'
import styles from './Login.module.css';
import { Button } from '../Buttons/Button'
import axios, { BASE_URL } from "../../api/axios";
import { getTokenHeader } from "../../hooks/UtilityHooks";
import { isAxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [username, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setIsLogged, isLogged } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (success === true) {
        navigate("/");
      }
    }, [success]);
    

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault()

        try {
            const user = {
                username: username,
                password: password
                };
            const axiosHeader = getTokenHeader()
            const res = await axiosHeader.post(`${BASE_URL}/api/auth/signin`, user)
            localStorage.setItem("token", res.data.accessToken);
            console.log(res)
            
            setSuccess(true);
            setIsLogged(true);
            console.log("Zalogowany?" + isLogged)
            navigate("/");
          } catch (err) {
            setErrorMessage("Whoops, something went wrong!");
            console.log("some error" + err)
      
            if (isAxiosError(err)) {
              if (err?.response?.status === 400) {
                setErrorMessage(err.response.data);
              }
            }
          }

        return;
    }

    return (
      <div className={styles.loginContainer}>
        <p>LOGIN</p>
        <form onSubmit={onSubmit}>
            <div className={styles.loginRowsContainer}>
                <div className={styles.loginRow}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Enter your login"
                />
                </div>
                <div className={styles.loginRow}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                </div>
                <div className={styles.loginRow}>
                    <Button buttonStyle='btn--outline2' type={undefined} onClick={undefined} buttonSize={undefined}>Login</Button>
                </div>
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                <div className={styles.loginRow}>
                    No account? <a href="/register">Register HERE</a>
                </div>
            </div>
        </form>
      </div>
    );
}

export default Login
  