import React from 'react';
import DashboardTop from '../components/DashboardTop';
import styles from '../assets/styles/routes/Home.module.css';
import { useQuery } from 'react-query';
import { getTransactions } from '../app/api/api';
import { useStateContext } from '../context';
import type { AxiosError } from 'axios';
import type { TransactionsGet } from '../app/api/types';

const Home: React.FC = ({}) => {
  const { state } = useStateContext();
  const { isLoading, isError, data, error } = useQuery('transactions', () =>
    getTransactions(state.authUser?.token)
  );
  const {
    isLoading: isRecentLoading,
    isError: isRecentError,
    data: recentData,
    error: recentError,
  } = useQuery(['transactions', 'recent'], () =>
    getTransactions(state.authUser?.token, true)
  );

  return (
    <section className={styles.home} aria-label="Dashboard Home">
      <DashboardTop userToken={state.authUser?.token} />
    </section>
  );
};

export default Home;
