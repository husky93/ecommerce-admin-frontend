import React from 'react';
import logoImage from '../assets/images/logo.png';
import styles from '../assets/styles/components/Logo.module.css';

interface LogoProps {
  text: string;
  sm?: boolean;
}

const Logo: React.FC<LogoProps> = ({ text, sm }) => {
  const smStyles = sm ? { fontSize: '1.15rem' } : undefined;
  return (
    <div className={styles.container}>
      <img src={logoImage} className={styles.logo} />
      <h1 className={styles.text} style={smStyles}>
        {text}
      </h1>
    </div>
  );
};

export default Logo;
