import React from 'react';
import styles from '../../assets/styles/components/dashboard/DashboardRecent.module.css';
import TableLoader from '../loaders/TableLoader';
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
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <TableLoader rows={5} />
        </div>
      )}
      {isError && (
        <div className={styles.dashboard_recent}>
          <span>{(error as AxiosError).message}</span>
        </div>
      )}
      {data && (
        <div className={styles.dashboard_recent}>
          <div className={styles.recent_top}>
            <h2 className={styles.heading}>Recent Transactions</h2>
            <Link
              to="transactions"
              className={styles.trans_link}
            >{`See all transactions >`}</Link>
          </div>
          <div className={styles.table_wrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.tr}>
                  <th scope="col" className={styles.th}>
                    ID
                  </th>
                  <th scope="col" className={styles.th}>
                    Date Created
                  </th>
                  <th scope="col" className={styles.th}>
                    Ordered By
                  </th>
                  <th scope="col" className={styles.th}>
                    Status
                  </th>
                  <th scope="col" className={styles.th}>
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {data.map((item) => (
                  <tr key={item._id} className={styles.tr}>
                    <td
                      className={`${styles.td} ${styles.id}`}
                      scope="row"
                      data-label="ID"
                    >
                      <Link to={`transactions/${item._id}`}>{item._id}</Link>
                    </td>
                    <td
                      className={`${styles.td} ${styles.date}`}
                      data-label="Date Created"
                    >
                      {format(new Date(item.createdAt), 'HH:mm, do MMM yyyy')}
                    </td>
                    <td
                      className={styles.td}
                      data-label="Ordered By"
                    >{`${item.user.name} ${item.user.surname}`}</td>
                    <td
                      className={`${styles.td} ${styles.status}`}
                      style={{ color: setStatusColor(item.status) }}
                      data-label="Status"
                    >
                      {item.status}
                    </td>
                    <td
                      className={`${styles.td} ${styles.value}`}
                      data-label="Value"
                    >
                      {getAllItemsSum(item.items)} USD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
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
  if (status === 'delivered' || status === 'paid') return '#18DDBD';
  if (status === 'cancelled' || status === 'payment failed') return '#DE2329';
  return '#7A7A7A';
};

export default DashboardRecent;
