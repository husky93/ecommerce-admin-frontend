import React, { useState } from 'react';
import styles from '../assets/styles/routes/Item.module.css';
import Spinner from '../components/loaders/Spinner';
import ItemForm from '../components/ItemForm';
import Modal from '../components/Modal';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { deleteItem, getItem } from '../app/api/api';
import { useFormMutation } from '../app/hooks';
import { FiTrash2 } from 'react-icons/fi';

interface ItemProps {
  mode: 'create' | 'update';
}

const Item: React.FC<ItemProps> = ({ mode }) => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['items', id], () =>
    getItem(id)
  );
  const {
    mutate,
    isLoading: isDeleting,
    error: deleteError,
  } = useFormMutation(deleteItem, 'items');
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      {(isLoading || isDeleting) && <Spinner />}
      {isError && <span>Error: {(error as any).message}</span>}
      {deleteError && (
        <span className={styles.error}>
          Error: {deleteError.response.data.error}
        </span>
      )}
      {data && (
        <div>
          <h2 className={styles.heading}>{`Update ${data.title} Item`}</h2>
          <button onClick={handleDeleteClick} className="btn-primary btn-icon">
            <FiTrash2 />
            Delete Item
          </button>
          <ItemForm data={data} mode={mode} />
          {isModalVisible && (
            <Modal handleClose={handleModalClose}>
              <h3>Delete {data.title}</h3>
              <p>Are you sure you want to delete this item?</p>
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
          <h2 className={styles.heading}>Create New Item</h2>
          <ItemForm mode={mode} />
        </div>
      )}
    </div>
  );
};

export default Item;
