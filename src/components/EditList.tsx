import React from 'react';
import TableLoader from './loaders/TableLoader';
import styles from '../assets/styles/components/EditList.module.css';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type {
  CategoriesGet,
  ItemsGet,
  TransactionsGet,
} from '../app/api/types';
import type { AxiosError } from 'axios';

interface EditListProps {
  isLoading: boolean;
  isError: boolean;
  data: CategoriesGet | ItemsGet | TransactionsGet | undefined;
  error: unknown;
  name: string;
}

const EditList: React.FC<EditListProps> = ({
  isLoading,
  isError,
  data,
  error,
  name,
}) => {
  return (
    <>
      {isLoading && <TableLoader />}
      {isError && (
        <span>
          {(error as AxiosError).response?.status === 404
            ? `No ${name} found.`
            : `Error: ${(error as AxiosError).message}`}
        </span>
      )}
      {data && (
        <ul className={styles.list}>
          {data.map((elem) => (
            <li key={elem._id} className={styles.item}>
              {'title' in elem ? elem.title : elem._id}
              <Link to={`/dashboard/${name}/${elem._id}`}>
                <button className="btn-primary btn-icon">
                  <FiEdit /> Edit
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default EditList;
