import React from 'react';
import styles from './Loader.module.css'; // Import CSS module for styles

type LoaderProps = {
    width: number | string;
    height: number | string;
};


const Loader: React.FC<LoaderProps> = ({ width, height }) => {
    return (
        <div className={styles.loaderContainer} style={{ width, height }}>
            <div className={styles.loader}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
};

export default Loader;
