import React from 'react';
import styles from '../assets/styles/components/Card.module.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
}

const Card: React.FC<CardProps> = ({ title, children, variant }) => {
  const style = {
    '--card-primary-color': variant === 'primary' ? '#FDEDD0' : '#FFEECA',
    '--card-secondary-color': variant === 'primary' ? '#D1D4FC' : '#FEE1ED',
  } as React.CSSProperties;

  return (
    <div className={styles.card} style={style}>
      <div className={styles.card_top}>{title}</div>
      <div className={styles.card_bottom}>{children}</div>
    </div>
  );
};

export default Card;
