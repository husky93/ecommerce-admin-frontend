import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/routes/Transaction.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTransaction } from '../app/api/api';
import { useStateContext } from '../context';

const Transaction: React.FC = ({}) => {
  const { id } = useParams();
  const { state } = useStateContext();
  const [totalPrice, setTotalPrice] = useState(0);

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
        }
      },
    }
  );

  console.log(transaction);

  return (
    <div className={styles.transaction}>
      {isLoading && <Spinner />}
      {isError && <span>Error: {(error as any).message}</span>}
      {transaction && (
        <div>
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
          <ul className={styles.item_list}>
            {transaction.items.map((element) => (
              <li className={styles.list_item}>
                <div>Name: {element.item.title}</div>
                <div>Price: {element.item.price}$</div>
                <div>Quantity: {element.quantity}</div>
                <div>Sum: {element.quantity * element.item.price}$</div>
              </li>
            ))}
            <div className={styles.total}>
              Total Price: <span>{totalPrice}$</span>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Transaction;
