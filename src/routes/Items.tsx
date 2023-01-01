import React from 'react';
import styles from '../assets/styles/routes/Items.module.css';
import Spinner from '../components/Spinner';
import CreateButton from '../components/CreateButton';
import { Link } from 'react-router-dom';
import { getItems } from '../app/api/api';
import { useQuery } from 'react-query';
import type { AxiosError } from 'axios';

const Items: React.FC = ({}) => {
  const { isLoading, isError, data, error } = useQuery('items', getItems);

  return (
    <div className={styles.items}>
      <div className={styles.ui}>
        <CreateButton to="/dashboard/items/new" />
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
