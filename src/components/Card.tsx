import React from 'react';
import styles from '../assets/styles/components/Card.module.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return <div className={styles.card}></div>;
};
