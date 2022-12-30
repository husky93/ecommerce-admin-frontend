import React from 'react';
import styles from '../assets/styles/components/Card.module.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary';
}

const Card: React.FC<CardProps> = ({ title, children, variant }) => {
  const getPrimaryColor = (): string => {
    if (variant === 'primary') return '#FDEDD0';
    if (variant === 'secondary') return '#FFEECA';
    return '#FFEECA';
  };

  const getSecondaryColor = (): string => {
    if (variant === 'primary') return '#D1D4FC';
    if (variant === 'secondary') return '#FEE1ED';
    return '#6fdfcc';
  };

  const style = {
    '--card-primary-color': getPrimaryColor(),
    '--card-secondary-color': getSecondaryColor(),
  } as React.CSSProperties;

  return (
    <div className={styles.card} style={style}>
      <div className={styles.card_top}>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.card_bottom}>{children}</div>
    </div>
  );
};

export default Card;
