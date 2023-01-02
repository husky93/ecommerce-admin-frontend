import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/MenuLink.module.css';

interface MenuLinkProps {
  children: React.ReactNode;
  to: string;
  handleClick: React.MouseEventHandler;
}

const MenuLink: React.FC<MenuLinkProps> = ({ children, to, handleClick }) => {
  return (
    <li className={styles.item}>
      <Link to={to} className={styles.link} onClick={handleClick}>
        {children}
      </Link>
    </li>
  );
};

export default MenuLink;
