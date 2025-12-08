import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';

import styles from './MainLayout.module.css';

const MainLayout: React.FC = () => {
    const [isToggled, setIsToggled] = useState(false);
    const { currentUser } = useData();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    const toggleSidebar = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className={`d-flex ${isToggled ? 'toggled' : ''} ${styles.wrapper}`} id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper" className={styles.pageContentWrapper}>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className={`container-fluid ${styles.contentAreaPadding}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
