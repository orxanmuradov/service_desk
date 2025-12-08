import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const { searchQuery, setSearchQuery, currentUser, logout, allRequests } = useData();
    const location = useLocation();
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    // Refs for click outside detection
    const exportRef = useRef<HTMLLIElement>(null);
    const userRef = useRef<HTMLLIElement>(null);

    const handleExport = (format: 'xlsx' | 'pdf') => {
        import('../utils/exportUtils').then(({ exportToExcel, exportToPDF, prepareRequestData }) => {
            const { headers, data } = prepareRequestData(allRequests || []); // Use allRequests or filtered
            const filename = `umumi_sorgular_report.${format}`;

            if (format === 'xlsx') {
                exportToExcel(data, headers, filename);
            } else {
                exportToPDF(data, headers, filename);
            }
            setIsExportOpen(false);
        });
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
                setIsExportOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setIsUserOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Determine dashboard title based on location or search
    const getTitle = () => {
        if (location.pathname === "/excel-upload") return "Excel Yüklə";
        if (location.pathname === "/users") return "İstifadəçi İdarəetməsi";

        // Check query params for department
        const searchParams = new URLSearchParams(location.search);
        const dept = searchParams.get('department');
        if (dept) return `Dashboard - ${dept}`;

        if (searchQuery) return `Dashboard - "${searchQuery}" üçün`;
        return "Dashboard";
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light px-4 ${styles.navbar}`}>
            <div className="d-flex align-items-center">
                <i className={`fas fa-stream primary-text fs-4 me-3 ${styles.menuToggle}`} onClick={toggleSidebar}></i>
                <h2 className={`fs-2 m-0 ${styles.dashboardTitle}`}>{getTitle()}</h2>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className={`d-flex ms-auto me-3 my-2 my-lg-0 ${styles.searchForm}`} role="search" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Əməkdaş adını axtar..."
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit"><i className="fas fa-search"></i></button>
                </form>

                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item dropdown me-2" ref={exportRef}>
                        <a
                            className={`nav-link dropdown-toggle second-text fw-bold ${styles.exportLink}`}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setIsExportOpen(!isExportOpen); }}
                            role="button"
                            aria-expanded={isExportOpen}
                        >
                            <i className="fas fa-file-export me-2"></i>Export
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-end ${isExportOpen ? 'show' : ''}`}>
                            <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleExport('xlsx'); }}><i className="fas fa-file-excel me-2"></i>Ümumi Sorğu (Excel)</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleExport('pdf'); }}><i className="fas fa-file-pdf me-2"></i>Ümumi Sorğu (PDF)</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown" ref={userRef}>
                        <a
                            className={`nav-link dropdown-toggle second-text fw-bold ${styles.userLink}`}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setIsUserOpen(!isUserOpen); }}
                            role="button"
                            aria-expanded={isUserOpen}
                        >
                            <i className="fas fa-user me-2"></i>{currentUser?.username || "Admin User"}
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-end ${isUserOpen ? 'show' : ''}`}>
                            <li><a className="dropdown-item" href="#">Profil</a></li>
                            <li><a className="dropdown-item" href="#">Ayarlar</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Çıxış</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
