import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';
import styles from '../assets/styles/routes/Dashboard.module.css';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <Menu />
      </aside>
      <Outlet />
    </main>
  );
};

export default Dashboard;
