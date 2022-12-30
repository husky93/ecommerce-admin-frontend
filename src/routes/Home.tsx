import React from 'react';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import styles from '../assets/styles/routes/Home.module.css';
import { useQuery } from 'react-query';
import { getTransactions } from '../app/api/api';
import { useStateContext } from '../context';
import type { AxiosError } from 'axios';

const Home: React.FC = ({}) => {
  const { state } = useStateContext();
  const { isLoading, isError, data, error } = useQuery('transactions', () =>
    getTransactions(state.authUser?.token)
  );

  return (
    <section className={styles.home} aria-label="Dashboard Home">
      {isLoading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
      {isError && (
        <div className={styles.dashboard_top}>
          <span>{(error as AxiosError).message}</span>
        </div>
      )}
      {data && (
        <div className={styles.dashboard_top} aria-label="Dashboard Top">
          <Card title="Sales" variant="primary">
            Sales: 345$
          </Card>
          <Card title="Sales" variant="secondary">
            Sales: 345$
          </Card>
          <Card title="Sales" variant="tertiary">
            Sales: 345$
          </Card>
        </div>
      )}
    </section>
  );
};

export default Home;
