import React from 'react';
import styles from '../assets/styles/routes/Categories.module.css';
import CreateButton from '../components/CreateButton';
import EditList from '../components/EditList';
import { useQuery } from 'react-query';
import { getCategories } from '../app/api/api';

const Categories: React.FC = ({}) => {
  const { isLoading, isError, data, error } = useQuery(
    'categories',
    getCategories
  );

  return (
    <div className={styles.categories}>
      <div className={styles.ui}>
        <CreateButton to="/dashboard/categories/new" />
      </div>
      <EditList
        isLoading={isLoading}
        isError={isError}
        data={data}
        error={error}
        name="categories"
      />
    </div>
  );
};

export default Categories;
