import React from 'react';
import styles from '../assets/styles/routes/Categories.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getCategories } from '../app/api/api';

const Categories: React.FC = ({}) => {
  const { isLoading, isError, data, error } = useQuery(
    'categories',
    getCategories
  );

  return (
    <div className={styles.categories}>
      {isLoading && <Spinner />}
      {isError && <span>Error: {error.message}</span>}
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
