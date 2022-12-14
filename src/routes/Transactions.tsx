import React from 'react';
import EditList from '../components/EditList';
import styles from '../assets/styles/routes/Transactions.module.css';
import { useQuery } from 'react-query';
import { getTransactions } from '../app/api/api';
import { useStateContext } from '../context';

const Transactions: React.FC = ({}) => {
  const { state } = useStateContext();
  const { isLoading, isError, data, error } = useQuery('transactions', () =>
    getTransactions(state.authUser?.token)
  );

  return (
    <div>
      <h2 className={styles.heading}>Transactions</h2>
      <EditList
        isLoading={isLoading}
        isError={isError}
        data={data}
        error={error}
        name="transactions"
      />
    </div>
  );
};

export default Transactions;
