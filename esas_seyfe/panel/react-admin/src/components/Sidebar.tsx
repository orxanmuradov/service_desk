import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    const { logout } = useData();
    const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

    const toggleDepartments = () => {
        setIsDepartmentsOpen(!isDepartmentsOpen);
    };

    return (
        <div className={styles.sidebarWrapper} id="sidebar-wrapper">
            <div className={`sidebar-heading text-center py-4 fs-4 fw-bold text-uppercase border-bottom ${styles.sidebarHeading}`}>
                <i className="fas fa-tools me-2"></i>Admin Panel
            </div>
            <div className={`list-group list-group-flush my-3 ${styles.listGroup}`}>
                <NavLink
                    to="/"
                    className={({ isActive }) => `list-group-item list-group-item-action bg-transparent ${styles.listGroupItem} ${isActive ? styles.active : ''}`}
                    end
                >
                    <i className="fas fa-tachometer-alt me-3"></i>Dashboard
                </NavLink>
                <NavLink
                    to="/excel-upload"
                    className={({ isActive }) => `list-group-item list-group-item-action bg-transparent ${styles.listGroupItem} ${isActive ? styles.active : ''}`}
                >
                    <i className="fas fa-file-excel me-3"></i>Excel Yüklə
                </NavLink>
                <NavLink
                    to="/users"
                    className={({ isActive }) => `list-group-item list-group-item-action bg-transparent ${styles.listGroupItem} ${isActive ? styles.active : ''}`}
                >
                    <i className="fas fa-users-cog me-3"></i>İstifadəçi İdarəetməsi
                </NavLink>

                <div
                    className={`list-group-item list-group-item-action bg-transparent dropdown-toggle ${styles.listGroupItem}`}
                    onClick={toggleDepartments}
                    role="button"
                    aria-expanded={isDepartmentsOpen}
                >
                    <i className="fas fa-building me-3"></i>Şöbələr
                    <i className={`fas fa-chevron-down ${styles.chevron} ${isDepartmentsOpen ? styles.rotate : ''}`}></i>
                </div>

                <div className={`collapse ${isDepartmentsOpen ? 'show' : ''}`} id="departmentsCollapse">
                    {['Sistem', 'Şəbəkə', 'Help Desk', 'Infosec', 'ERP', 'Developer'].map(dept => (
                        <Link
                            key={dept}
                            to={`/?department=${dept}`}
                            className={`list-group-item list-group-item-action bg-transparent ${styles.listGroupSubItem}`}
                        >
                            {dept}
                        </Link>
                    ))}
                </div>
                <a
                    href="#"
                    className={`list-group-item list-group-item-action bg-transparent text-danger fw-bold ${styles.listGroupItem}`}
                    onClick={(e) => { e.preventDefault(); logout(); }}
                >
                    <i className="fas fa-sign-out-alt me-2"></i>Çıxış
                </a>
            </div>
        </div>
    );
};


export default Sidebar;
