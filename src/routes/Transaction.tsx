import React, { useReducer } from 'react';
import styles from '../assets/styles/routes/Transaction.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTransaction } from '../app/api/api';
import { useStateContext } from '../context';

const Transaction: React.FC = ({}) => {
  const { id } = useParams();
  const { state } = useStateContext();

  const {
    isLoading,
    isError,
    data: transaction,
    error,
  } = useQuery(['transactions', id], () =>
    getTransaction(state.authUser?.token, id)
  );

  console.log(transaction);

  return (
    <div className={styles.transaction}>
      {isLoading && <Spinner />}
      {isError && <span>Error: {(error as any).message}</span>}
      {transaction && (
        <div>
          <div className={styles.user_info}>
            <div>
              Client name:{' '}
              <span>{`${transaction.user.name} ${transaction.user.surname}`}</span>
            </div>
            <div>
              Address:
              <div>
                City: <span>{transaction.user.address.city}</span>
              </div>
              <div>
                Zip Code: <span>{transaction.user.address.zip_code}</span>
              </div>
              <div>
                Street: <span>{transaction.user.address.street}</span>
              </div>
              <div>
                House Number: <span>{transaction.user.address.house_num}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
