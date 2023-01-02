import React from 'react';
import styles from '../assets/styles/components/Menu.module.css';
import MenuLink from './MenuLink';
import {
  FiHome,
  FiFolder,
  FiShoppingBag,
  FiShoppingCart,
} from 'react-icons/fi';

interface MenuProps {
  toggleMenu: React.MouseEventHandler;
}

const Menu: React.FC<MenuProps> = ({ toggleMenu }) => {
  return (
    <nav className={styles.menu}>
      <h3 className={styles.heading}>Menu</h3>
      <ul>
        <MenuLink to="/dashboard/" handleClick={toggleMenu}>
          <FiHome /> Dashboard
        </MenuLink>
        <MenuLink to="/dashboard/categories" handleClick={toggleMenu}>
          <FiFolder /> Categories
        </MenuLink>
        <MenuLink to="/dashboard/items" handleClick={toggleMenu}>
          <FiShoppingBag /> Items
        </MenuLink>
        <MenuLink to="/dashboard/transactions" handleClick={toggleMenu}>
          <FiShoppingCart /> Transactions
        </MenuLink>
      </ul>
    </nav>
  );
};

export default Menu;
