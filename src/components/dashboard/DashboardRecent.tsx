import React from 'react';
import styles from '../../assets/styles/components/dashboard/DashboardRecent.module.css';
import Spinner from '../Spinner';
import { useQuery } from 'react-query';
import { getTransactions } from '../../app/api/api';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import type { AxiosError } from 'axios';
import type { TransactionItem, TransactionStatus } from '../../app/api/types';

interface DashboardRecentProps {
  userToken: string | undefined;
}

const DashboardRecent: React.FC<DashboardRecentProps> = ({ userToken }) => {
  const { isLoading, isError, data, error } = useQuery(
    ['transactions', 'recent'],
    () => getTransactions(userToken, true)
  );

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
      {isError && (
        <div className={styles.dashboard_recent}>
          <span>{(error as AxiosError).message}</span>
        </div>
      )}
      {data && (
        <div className={styles.dashboard_recent}>
          <h2 className={styles.heading}>Recent Transactions</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Date Created</th>
                <th className={styles.th}>Ordered By</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className={styles.td}>
                    <Link to={`transactions/${item._id}`}>{item._id}</Link>
                  </td>
                  <td className={styles.td}>
                    {format(new Date(item.createdAt), 'HH:mm, do MMM yyyy')}
                  </td>
                  <td
                    className={styles.td}
                  >{`${item.user.name} ${item.user.surname}`}</td>
                  <td
                    className={styles.td}
                    style={{ color: setStatusColor(item.status) }}
                  >
                    {item.status}
                  </td>
                  <td className={styles.td}>{getAllItemsSum(item.items)}USD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const getAllItemsSum = (items: Array<TransactionItem>): number => {
  return items.reduce((prevValue, currentValue) => {
    return (
      Math.round(
        prevValue + currentValue.item.price_gross * currentValue.quantity * 100
      ) / 100
    );
  }, 0);
};

const setStatusColor = (status: TransactionStatus): Color => {
  if (status === 'pending') return '#51459F';
  if (status === 'delivered' || status === 'paid') return '#18DDBD';
  if (status === 'cancelled' || status === 'payment failed') return '#DE2329';
  return '#000000';
};

export default DashboardRecent;
