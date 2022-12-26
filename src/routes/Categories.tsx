import React from 'react';
import styles from '../assets/styles/routes/Categories.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getCategories } from '../app/api/api';
import type { AxiosError } from 'axios';

const Categories: React.FC = ({}) => {
  const { isLoading, isError, data, error } = useQuery(
    'categories',
    getCategories,
    {
      initialData: [],
    }
  );

  return (
    <div className={styles.categories}>
      <div className={styles.ui}>
        <Link to="/dashboard/categories/new">
          <button className={styles.btn}>Create New</button>
        </Link>
      </div>
      {isLoading && <Spinner />}
      {isError && (
        <span>
          {(error as AxiosError).response?.status === 404
            ? 'No categories found'
            : `Error: ${(error as AxiosError).message}`}
        </span>
      )}
      {data && (
        <div>
          {data.map((category) => (
            <Link to={`/dashboard/categories/${category._id}`}>
              {category.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
