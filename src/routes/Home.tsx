import React, { useState } from 'react';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import styles from '../assets/styles/routes/Home.module.css';
import { useQuery } from 'react-query';
import { getTransactions } from '../app/api/api';
import { useStateContext } from '../context';
import type { AxiosError } from 'axios';
import Items from './Items';

const Home: React.FC = ({}) => {
  const [displayInfo, setDisplayInfo] = useState({
    profit: 0,
    sold_items: 0,
    taxes: 0,
  });
  const { state } = useStateContext();
  const { isLoading, isError, data, error } = useQuery(
    'transactions',
    () => getTransactions(state.authUser?.token),
    {
      onSuccess: (data) => {
        let sum = {
          profit: 0,
          sold_items: 0,
          taxes: 0,
        };
        data?.forEach((transaction) => {
          const { items } = transaction;
          sum = items.reduce((prevValue, el) => {
            const { quantity } = el;
            const taxes =
              prevValue.taxes +
              (el.item.price_gross - el.item.price - el.item.profit) * quantity;
            return {
              profit: prevValue.profit + el.item.profit * quantity,
              sold_items: prevValue.sold_items + quantity,
              taxes: Math.round(taxes * 100) / 100,
            };
          }, sum);
        });
        setDisplayInfo(sum);
      },
    }
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
          <Card title="Net Profit" variant="primary">
            {displayInfo.profit}$
          </Card>
          <Card title="# of Items Sold" variant="secondary">
            {displayInfo.sold_items}
          </Card>
          <Card title="Taxes to Pay" variant="tertiary">
            {displayInfo.taxes}$
          </Card>
        </div>
      )}
    </section>
  );
};

export default Home;
