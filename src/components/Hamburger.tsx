import React from 'react';
import styles from '../assets/styles/components/Hamburger.module.css';
import { FiMenu } from 'react-icons/fi';

interface HamburgerProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Hamburger: React.FC<HamburgerProps> = ({ handleClick }) => {
  return (
    <button
      aria-label="Toggle Menu"
      className={styles.hamburger}
      onClick={handleClick}
    >
      <FiMenu size="2rem" />
    </button>
  );
};
export default Hamburger;
