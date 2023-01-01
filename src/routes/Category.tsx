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

interface CategoryProps {
  mode: 'update' | 'create';
}

const Category: React.FC<CategoryProps> = ({ mode }) => {
  const { id } = useParams();
  const { mutate, isLoading: isDeleting } = useFormMutation(
    deleteCategory,
    'categories'
  );
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
      {(query.isLoading || isDeleting) && <Spinner />}
      {query.isError && <span>Error: {(query.error as any).message}</span>}
      {query.data && (
        <div>
          <button onClick={handleDeleteClick}>Delete Category</button>
          <CategoryForm data={query.data} mode={mode} />
          {isModalVisible && (
            <Modal handleClose={handleModalClose}>
              <h3>Delete {query.data.title}</h3>
              <p>Are you sure you want to delete this category?</p>
              <div>
                <button onClick={handleConfirmClick}>Confirm</button>
                <button onClick={handleModalClose}>Cancel</button>
              </div>
            </Modal>
          )}
        </div>
      )}
      {mode === 'create' && <CategoryForm mode={mode} />}
    </div>
  );
};

export default Category;
