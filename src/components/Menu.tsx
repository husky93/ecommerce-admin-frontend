import React from 'react';
import styles from '../assets/styles/components/Menu.module.css';
import MenuLink from './MenuLink';

const Menu: React.FC = ({}) => {
  return (
    <nav className={styles.menu}>
      <ul>
        <MenuLink to="/dashboard/categories">Categories</MenuLink>
        <MenuLink to="/dashboard/items">Items</MenuLink>
        <MenuLink to="/dashboard/transactions">Transactions</MenuLink>
      </ul>
    </nav>
  );
};

export default Menu;
