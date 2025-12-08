import React from 'react';

interface Props {
    title: string;
    value: number;
    icon: string;
    color?: string;
    link?: string;
}

import styles from './StatCard.module.css';

const StatCard: React.FC<Props> = ({ title, value, icon, color = "text-primary" }) => {

    // Determine icon container style based on the text color prop
    const getIconClass = () => {
        if (color.includes('success')) return styles.iconSuccess;
        if (color.includes('warning')) return styles.iconWarning;
        if (color.includes('danger')) return styles.iconDanger;
        return styles.iconPrimary;
    };

    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <a href="#" className="text-decoration-none" onClick={(e) => e.preventDefault()}>
                <div className={styles.statCard}>
                    <div className={styles.content}>
                        <h3 className={styles.value}>{value}</h3>
                        <p className={styles.title}>{title}</p>
                    </div>
                    <div className={`${styles.iconContainer} ${getIconClass()}`}>
                        <i className={`fas ${icon}`}></i>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default StatCard;
