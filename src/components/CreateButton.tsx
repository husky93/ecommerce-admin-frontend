import React from 'react';
import styles from '../assets/styles/components/CreateButton.module.css';
import { Link } from 'react-router-dom';
import { FiFolderPlus } from 'react-icons/fi';

interface CreateButtonProps {
  to: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ to }) => {
  return (
    <Link to={to}>
      <button className={styles.btn}>
        <FiFolderPlus /> Create New
      </button>
    </Link>
  );
};
export default CreateButton;
