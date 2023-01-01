import React from 'react';
import Spinner from './Spinner';
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
      {isLoading && <Spinner />}
      {isError && (
        <span>
          {(error as AxiosError).response?.status === 404
            ? `No ${name} found.`
            : `Error: ${(error as AxiosError).message}`}
        </span>
      )}
      {data && (
        <div>
          {data.map((elem) => (
            <div key={elem._id}>
              {'title' in elem ? elem.title : elem._id}
              <Link to={`/dashboard/${name}/${elem._id}`}>
                <button className={styles.btn}>
                  <FiEdit /> Edit
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default EditList;
