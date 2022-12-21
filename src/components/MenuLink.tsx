import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/MenuLink.module.css';

interface MenuLinkProps {
  children: React.ReactNode;
  to: string;
}

export const MenuLink: React.FC<MenuLinkProps> = ({ children, to }) => {
  return (
    <li className={styles.item}>
      <Link to={to} className={styles.link}>
        {children}
      </Link>
    </li>
  );
};
