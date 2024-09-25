"use client";

import React from "react";
import styles from "./pagination.module.css";

type PaginationProps = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (newPage: number) => void;
};


const Pagination: React.FC<PaginationProps> = ({ page, hasPrev, hasNext, onPageChange }) => {

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        // onClick={() => router.push(`?page=${page - 1}`)}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        // onClick={() => router.push(`?page=${page + 1}`)}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
