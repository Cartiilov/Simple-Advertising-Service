import { useState } from "react";
import styles from "./Register.module.css";
import { Button } from "../Buttons/Button";
import { isAxiosError } from "axios";
import { BASE_URL } from "../../api/axios";
import { getTokenHeader } from "../../hooks/UtilityHooks";
import { useNavigate } from "react-router-dom";

const Register = (e: any) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!username || !email || !password || !repeatPassword) {
      setErrorMessage("All fields must be filled out.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (password.length < 5 || repeatPassword.length < 5) {
      setErrorMessage("Password must be at least 5 characters long.");
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const user = {
        username: username,
        email: email,
        role: ["ROLE_USER"],
        password: password,
      };
      const axiosHeader = getTokenHeader();
      const res = await axiosHeader.post(`${BASE_URL}/api/auth/signup`, user);
      console.log(res);
      setSuccess(true);
      setErrorMessage("You have successfully registered!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 5000);
    } catch (err) {
      setErrorMessage("Whoops, something went wrong!");

      if (isAxiosError(err)) {
        if (err?.response?.status === 400) {
          setErrorMessage(err.response.data);
        }
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerRowsContainer}>
        <div className={styles.registerRow}>
          <label className={styles.label}>
            Username:
            <input
              type="login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.registerRow}>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.registerRow}>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.registerRow}>
          <label className={styles.label}>
            Repeat Password:
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.registerRow}>
          <Button
            type="submit"
            buttonStyle="btn--outline2"
            onClick={undefined}
            buttonSize={undefined}
          >
            Register
          </Button>
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <div className={styles.loginRow}>
          Already have an account? <a href="/sign-in">Login HERE</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
