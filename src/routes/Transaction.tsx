import React, { useReducer, useState } from 'react';
import styles from '../assets/styles/routes/Transaction.module.css';
import Spinner from '../components/loaders/Spinner';
import Select from 'react-select';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTransaction } from '../app/api/api';
import { useStateContext } from '../context';
import { useFormMutation } from '../app/hooks';
import { putTransaction } from '../app/api/api';
import type { ActionMeta } from 'react-select';

const selectOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'payment failed', label: 'Payment Failed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'paid', label: 'Paid' },
];

const Transaction: React.FC = ({}) => {
  const { id } = useParams();
  const { state } = useStateContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState('');
  const { mutate, isLoading: isMutationLoading } = useFormMutation(
    putTransaction,
    `transactions`,
    true
  );

  const {
    isLoading,
    isError,
    data: transaction,
    error,
  } = useQuery(
    ['transactions', id],
    () => getTransaction(state.authUser?.token, id),
    {
      onSuccess(data) {
        if (data) {
          const total = data.items.reduce((prevValue, obj) => {
            return prevValue + obj.item.price * obj.quantity;
          }, 0);
          setTotalPrice(total);
          setTransactionStatus(data.status);
        }
      },
    }
  );

  const onSelectChange: (newValue: any, actionMeta: ActionMeta<any>) => void = (
    newValue
  ) => {
    mutate({
      ...transaction,
      status: newValue.value,
      user: transaction?.user._id,
      items: transaction?.items.map((element) => {
        return { item: element.item._id, quantity: element.quantity };
      }),
    });
  };

  return (
    <div className={styles.transaction}>
      {isLoading && <Spinner />}
      {isError && <span>Error: {(error as any).message}</span>}
      {transaction && (
        <div className={styles.wrapper}>
          <h3>Client Info: </h3>
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
          <h3>Items: </h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Quantity</th>
                <th className={styles.th}>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {transaction.items.map((element) => (
                <tr key={element.item._id} className={styles.tr}>
                  <td>{element.item.title}</td>
                  <td>{Math.round(element.item.price_gross * 100) / 100}USD</td>
                  <td>{element.quantity}</td>
                  <td>
                    {Math.round(
                      element.quantity * element.item.price_gross * 100
                    ) / 100}
                    USD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.total}>
            Total Transaction Price: <span>{totalPrice}$</span>
          </div>
          <div className={styles.status}>
            Change Transaction Status:
            <Select
              className={styles.select}
              onChange={onSelectChange}
              options={selectOptions}
              defaultValue={selectOptions.find(
                (item) => item.value === transaction.status
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
