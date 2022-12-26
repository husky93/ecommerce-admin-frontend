import React from 'react';
import logoImage from '../assets/images/logo.png';
import styles from '../assets/styles/components/Logo.module.css';

interface LogoProps {
  text: string;
}

const Logo: React.FC<LogoProps> = ({ text }) => {
  return (
    <div className={styles.container}>
      <img src={logoImage} className={styles.logo} />
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};

export default Logo;
