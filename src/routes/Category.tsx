import React from 'react';
import styles from '../assets/styles/routes/Category.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const Category: React.FC = ({}) => {
  const { id } = useParams();

  return <div className={styles.category}>{id}</div>;
};

export default Category;
