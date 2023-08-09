import styles from "../../assets/styles/indexpage.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
      >
        Previous
      </button>
      <span>
        Page: {totalPages === 0 ? 0 : currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
