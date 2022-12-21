import React from 'react';
import styles from '../assets/styles/routes/Category.module.css';
import Spinner from '../components/Spinner';
import CategoryForm from '../components/CategoryForm';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCategory } from '../app/api/api';

interface CategoryProps {
  mode: 'update' | 'create';
}

const Category: React.FC<CategoryProps> = ({ mode }) => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['categories', id], () =>
    getCategory(id)
  );

  return (
    <div className={styles.category}>
      {isLoading && <Spinner />}
      {isError && <span>Error: {(error as any).message}</span>}
      {data && <CategoryForm data={data} mode={mode} />}
    </div>
  );
};

export default Category;
