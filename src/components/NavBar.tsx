import React from 'react';
import styles from '../assets/styles/components/NavBar.module.css';
import profileImg from '../assets/images/profile.webp';
import { FiBell, FiMessageSquare } from 'react-icons/fi';
import { useStateContext } from '../context';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { state } = useStateContext();

  return (
    <nav className={styles.nav}>
      <div className={styles.ui}>
        <button className={styles.ui_btn} aria-label="Notifications">
          <FiBell />
        </button>
        <button className={styles.ui_btn} aria-label="Messages">
          <FiMessageSquare />
        </button>
      </div>
      <div className={styles.user}>
        <span
          className={styles.name}
        >{`${state.authUser?.user.name} ${state.authUser?.user.surname}`}</span>
        <img
          alt="Profile picture"
          className={styles.profile}
          src={profileImg}
        />
      </div>
    </nav>
  );
};
export default NavBar;
