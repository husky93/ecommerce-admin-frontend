import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/routes/Items.module.css';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { getItems } from '../app/api/api';
import { useQuery } from 'react-query';
import type { AxiosError } from 'axios';

const Items: React.FC = ({}) => {
  const { isLoading, isError, data, error } = useQuery('items', getItems);

  return (
    <div className={styles.items}>
      <div className={styles.ui}>
        <Link to="/dashboard/items/new">
          <button className={styles.btn}>Create New</button>
        </Link>
      </div>
      {isLoading && <Spinner />}
      {isError && (
        <span>
          {(error as AxiosError).response?.status === 404
            ? 'No items found'
            : `Error: ${(error as AxiosError).message}`}
        </span>
      )}
      {data && (
        <div>
          {data.map((item) => (
            <Link to={`/dashboard/items/${item._id}`}>{item.title}</Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Items;
