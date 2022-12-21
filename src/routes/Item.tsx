import React from 'react';
import styles from '../assets/styles/routes/Item.module.css';
import Spinner from '../components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getItem } from '../app/api/api';

const Item: React.FC = ({}) => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['items', id], () =>
    getItem(id)
  );

  return <div className={styles.item}>{id}</div>;
};

export default Item;
