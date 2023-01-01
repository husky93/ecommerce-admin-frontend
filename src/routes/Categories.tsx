import React from 'react';
import styles from '../assets/styles/routes/Categories.module.css';
import Spinner from '../components/Spinner';
import CreateButton from '../components/CreateButton';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getCategories } from '../app/api/api';
import { FiEdit } from 'react-icons/fi';
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
        <CreateButton to="/dashboard/categories/new" />
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
            <div key={category._id}>
              {category.title}
              <Link to={`/dashboard/categories/${category._id}`}>
                <button className={styles.btn}>
                  <FiEdit /> Edit
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
