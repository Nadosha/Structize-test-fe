import React, { useState } from 'react';
import { SideBar } from '@Components/UI/Sidebar';
import styles from './BasicLayout.module.scss';
import { Drawer } from '@Components/UI/Drawer';

type BaseLayoutProps = {
  children: React.ReactNode;
  currentRoute?: string;
};

const BasicLayout = ({ children }: BaseLayoutProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={styles.layout}>
      <SideBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default BasicLayout;
