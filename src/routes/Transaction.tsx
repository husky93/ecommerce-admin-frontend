import React from 'react';
import styles from '../assets/styles/routes/Transaction.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTransaction } from '../app/api/api';
import { useStateContext } from '../context';

const Transaction: React.FC = ({}) => {
  const { id } = useParams();
  const { state } = useStateContext();

  const { isLoading, isError, data, error } = useQuery(
    ['transactions', id],
    () => getTransaction(state.authUser?.token, id)
  );

  return (
    <div className={styles.transaction}>
      {isLoading && <Spinner />}
      {isError && <span>Error: {(error as any).message}</span>}
      {data && <div>{data._id}</div>}
    </div>
  );
};

export default Transaction;
