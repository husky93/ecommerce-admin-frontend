import React from 'react';
import styles from '../assets/styles/components/NavBar.module.css';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return <nav className={styles.nav}></nav>;
};
export default NavBar;
