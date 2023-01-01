import React from 'react';
import DashboardTop from '../components/dashboard/DashboardTop';
import DashboardRecent from '../components/dashboard/DashboardRecent';
import styles from '../assets/styles/routes/Home.module.css';
import { useStateContext } from '../context';
const Home: React.FC = ({}) => {
  const { state } = useStateContext();

  return (
    <section className={styles.home} aria-label="Dashboard Home">
      <DashboardTop userToken={state.authUser?.token} />
      <DashboardRecent userToken={state.authUser?.token} />
    </section>
  );
};

export default Home;
