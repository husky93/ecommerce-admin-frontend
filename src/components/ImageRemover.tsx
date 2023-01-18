import React from 'react';
import styles from '../assets/styles/components/ImageRemover.module.css';

interface ImageRemoverProps {
  img: string;
  removeHandler: React.Dispatch<React.SetStateAction<string>>;
}

const ImageRemover: React.FC<ImageRemoverProps> = ({ img, removeHandler }) => {
  return (
    <div className={styles.container}>
      <label>Cover Image:</label>
      <div className={styles.img_container}>
        <img src={img} alt="Cover image" className={styles.img} />
        <button className={styles.remove_btn} onClick={() => removeHandler('')}>
          X
        </button>
      </div>
    </div>
  );
};
export default ImageRemover;
