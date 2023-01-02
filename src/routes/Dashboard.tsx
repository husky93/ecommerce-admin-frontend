import React, { useState } from 'react';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import Logo from '../components/Logo';
import styles from '../assets/styles/routes/Dashboard.module.css';
import Hamburger from '../components/Hamburger';
import { Outlet } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuActive((prevState) => !prevState);
  };
  return (
    <main className={styles.main}>
      <Hamburger handleClick={toggleMenu} />
      <aside className={`${styles.aside} ${isMenuActive ? styles.active : ''}`}>
        <Logo text="Shop" sm />
        <Menu />
      </aside>
      <div className={styles.content}>
        <NavBar />
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
