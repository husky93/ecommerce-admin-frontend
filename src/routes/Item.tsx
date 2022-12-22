import React, { useState } from 'react';
import styles from '../assets/styles/routes/Item.module.css';
import Spinner from '../components/Spinner';
import ItemForm from '../components/ItemForm';
import Modal from '../components/Modal';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { deleteItem, getItem } from '../app/api/api';
import { useFormMutation } from '../app/hooks';

interface ItemProps {
  mode: 'create' | 'update';
}

const Item: React.FC<ItemProps> = ({ mode }) => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['items', id], () =>
    getItem(id)
  );
  const { mutate, isLoading: isDeleting } = useFormMutation(
    deleteItem,
    'items'
  );
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
      {data && (
        <div>
          <button onClick={handleDeleteClick}>Delete Item</button>
          <ItemForm data={data} mode={mode} />
          {isModalVisible && (
            <Modal handleClose={handleModalClose}>
              <h3>Delete {data.title}</h3>
              <p>Are you sure you want to delete this item?</p>
              <div>
                <button onClick={handleConfirmClick}>Confirm</button>
                <button onClick={handleModalClose}>Cancel</button>
              </div>
            </Modal>
          )}
        </div>
      )}
      {mode === 'create' && <ItemForm mode={mode} />}
    </div>
  );
};

export default Item;
