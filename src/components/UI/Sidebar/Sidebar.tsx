import React from 'react';
import styles from './Sidebar.module.scss';
const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center justify-center">
          <img src="/logo.png" />
          <div className="text-lg">
            Best way to automate your <em>life</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
