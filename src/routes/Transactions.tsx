import React from 'react';
import styles from '../assets/styles/routes/Transactions.module.css';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
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
      {isLoading && <Spinner />}
      {isError && <span>Error: {(error as any).message}</span>}
      {data && (
        <div>
          {data.map((transaction) => (
            <Link to={`/dashboard/transactions/${transaction._id}`}>
              {transaction._id}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
