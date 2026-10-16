import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      {/* Left Sidebar */}
      <aside className={styles.sidebarWrapper}>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
