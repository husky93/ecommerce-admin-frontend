import React, { useState } from 'react';
import styles from '../assets/styles/routes/Category.module.css';
import Spinner from '../components/loaders/Spinner';
import CategoryForm from '../components/CategoryForm';
import Modal from '../components/Modal';
import { useQuery } from 'react-query';
import { deleteCategory } from '../app/api/api';
import { useParams } from 'react-router-dom';
import { getCategory } from '../app/api/api';
import { ToastContainer } from 'react-toastify';
import { useFormMutation } from '../app/hooks';
import { FiTrash2 } from 'react-icons/fi';
import type { AxiosError } from 'axios';

interface CategoryProps {
  mode: 'update' | 'create';
}

type ErrorData = {
  error: string;
};

const Category: React.FC<CategoryProps> = ({ mode }) => {
  const { id } = useParams();
  const {
    mutate,
    isLoading: isDeleting,
    error,
  } = useFormMutation(deleteCategory, 'categories');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const query = useQuery(['categories', id], () => getCategory(id));

  const handleDeleteClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    setIsModalVisible(true);
  };

  const handleConfirmClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    mutate(null);
    setIsModalVisible(false);
  };

  const handleModalClose: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = (): void => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.category}>
      <ToastContainer />
      {(query.isLoading || isDeleting) && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
      {query.isError && (
        <span className={styles.error}>
          Error: {(query.error as AxiosError).message}
        </span>
      )}
      {error && (
        <span className={styles.error}>Error: {error.response.data.error}</span>
      )}
      {query.data && (
        <div className={styles.content}>
          <h2
            className={styles.heading}
          >{`Update ${query.data.title} Category`}</h2>
          <div>
            <button
              onClick={handleDeleteClick}
              className="btn-primary btn-icon"
            >
              <FiTrash2 />
              Delete Category
            </button>
          </div>
          <CategoryForm data={query.data} mode={mode} />
          {isModalVisible && (
            <Modal handleClose={handleModalClose}>
              <h3>Delete {query.data.title}</h3>
              <p>Are you sure you want to delete this category?</p>
              <div className={styles.modal_ui}>
                <button onClick={handleConfirmClick} className="btn-danger">
                  Confirm
                </button>
                <button onClick={handleModalClose} className="btn-primary">
                  Cancel
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
      {mode === 'create' && (
        <div>
          <h2 className={styles.heading}>Create New Category</h2>
          <CategoryForm mode={mode} />
        </div>
      )}
    </div>
  );
};

export default Category;
