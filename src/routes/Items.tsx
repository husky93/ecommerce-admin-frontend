import React from 'react';
import styles from '../assets/styles/routes/Items.module.css';
import CreateButton from '../components/CreateButton';
import EditList from '../components/EditList';
import { getItems } from '../app/api/api';
import { useQuery } from 'react-query';

const Items: React.FC = ({}) => {
  const { isLoading, isError, data, error } = useQuery('items', getItems);

  return (
    <div className={styles.items}>
      <h2 className={styles.heading}>Items</h2>
      <div className={styles.ui}>
        <CreateButton to="/dashboard/items/new" />
      </div>
      <EditList
        isLoading={isLoading}
        isError={isError}
        data={data}
        error={error}
        name="items"
      />
    </div>
  );
};

export default Items;
