import React from 'react';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import Logo from '../components/Logo';
import styles from '../assets/styles/routes/Dashboard.module.css';
import { Outlet } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
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
