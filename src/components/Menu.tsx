import React from 'react';
import styles from '../assets/styles/components/Menu.module.css';
import MenuLink from './MenuLink';
import {
  FiHome,
  FiFolder,
  FiShoppingBag,
  FiShoppingCart,
} from 'react-icons/fi';

const Menu: React.FC = ({}) => {
  return (
    <nav className={styles.menu}>
      <ul>
        <MenuLink to="/dashboard/">
          <FiHome /> Dashboard
        </MenuLink>
        <MenuLink to="/dashboard/categories">
          <FiFolder /> Categories
        </MenuLink>
        <MenuLink to="/dashboard/items">
          <FiShoppingBag /> Items
        </MenuLink>
        <MenuLink to="/dashboard/transactions">
          <FiShoppingCart /> Transactions
        </MenuLink>
      </ul>
    </nav>
  );
};

export default Menu;
