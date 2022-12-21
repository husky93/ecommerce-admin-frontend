import React from 'react';
import styles from '../assets/styles/routes/Category.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCategory } from '../app/api/api';

const Category: React.FC = ({}) => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['categories', id], () =>
    getCategory(id)
  );

  return <div className={styles.category}>{id}</div>;
};

export default Category;
