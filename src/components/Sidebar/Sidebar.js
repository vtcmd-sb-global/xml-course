import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { sidebarItems } from './SidebarItems';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const location = useLocation();
  const [openCategories, setOpenCategories] = useState({
    Sessions: true,
    Exercises: false,
  });

  const toggleCategory = (title) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.sidebar}>
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.title}>
            {item.children ? (
              <>
                <button
                  className={styles.categoryBtn}
                  onClick={() => toggleCategory(item.title)}
                >
                  {item.title}
                  <span>{openCategories[item.title] ? '▾' : '▸'}</span>
                </button>
  
                {openCategories[item.title] && (
                  <ul className={styles.subItems}>
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className={isActive(child.path) ? styles.active : ''}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={isActive(item.path) ? styles.active : ''}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
