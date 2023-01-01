import React, { useMemo } from 'react';
import CardLoader from '../loaders/CardLoader';
import Card from '../Card';
import styles from '../../assets/styles/components/dashboard/DashboardTop.module.css';
import { useQuery } from 'react-query';
import { getTransactions } from '../../app/api/api';
import type { TransactionsGet } from '../../app/api/types';
import type { AxiosError } from 'axios';

interface DashboardTopProps {
  userToken: string | undefined;
}

const DashboardTop: React.FC<DashboardTopProps> = ({ userToken }) => {
  const { isLoading, isError, data, error } = useQuery('transactions', () =>
    getTransactions(userToken)
  );
  const displayInfo = useMemo(() => getDisplayInfo(data), [data]);
  return (
    <>
      {isLoading && (
        <div className={styles.dashboard_top}>
          <CardLoader />
          <CardLoader />
          <CardLoader />
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
            <span className={styles.card_info}>
              {displayInfo.transaction_sum} USD
            </span>
          </Card>
          <Card title="Net Profit" variant="secondary">
            <span className={styles.card_info}>{displayInfo.profit} USD</span>
          </Card>
          <Card title="Taxes" variant="tertiary">
            <span className={styles.card_info}>{displayInfo.taxes} USD</span>
          </Card>
        </div>
      )}
    </>
  );
};

export interface HomeDisplayInfo {
  profit: number;
  sold_items: number;
  taxes: number;
  transaction_sum: number;
}

const getDisplayInfo = (data: TransactionsGet | undefined): HomeDisplayInfo => {
  let sum = {
    profit: 0,
    sold_items: 0,
    taxes: 0,
    transaction_sum: 0,
  };
  data?.forEach((transaction) => {
    const { items } = transaction;
    sum = items.reduce((prevValue, el) => {
      const { quantity, item } = el;
      const taxes =
        prevValue.taxes +
        (el.item.price_gross - item.price - item.profit) * quantity;
      return {
        profit: Math.round(prevValue.profit + item.profit * quantity),
        sold_items: prevValue.sold_items + quantity,
        taxes: Math.round(taxes),
        transaction_sum: Math.round(
          prevValue.transaction_sum + item.price_gross * quantity
        ),
      };
    }, sum);
  });
  return sum;
};

export default DashboardTop;
