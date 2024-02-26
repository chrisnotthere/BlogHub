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
    <div className="flex justify-center items-center gap-4 mx-auto mt-4 sm:mt-0 py-2 px-4 max-w-md border-2 border-bright-teal rounded-lg bg-white">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
        className="text-xs md:text-base border border-bright-teal rounded-lg py-2 px-4 cursor-pointer transition-colors duration-300 ease-linear hover:bg-soft-mint disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-xs md:text-base">
        Page: {totalPages === 0 ? 0 : currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="text-xs md:text-base border border-bright-teal rounded-lg py-2 px-4 cursor-pointer transition-colors duration-300 ease-linear hover:bg-soft-mint disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
