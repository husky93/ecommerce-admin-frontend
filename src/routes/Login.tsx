import React from 'react';
import styles from '../assets/styles/login/Login.module.css';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">E-Mail:</label>
        <input
          id="username"
          name="username"
          type="email"
          placeholder="example@website.com"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="example@website.com"
        />
      </form>
    </main>
  );
};

export default Login;
