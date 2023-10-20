import LeftArrow from "../Icons/LeftArrow/LeftArrow";
import RightArrow from "../Icons/RightArrow/RightArrow"; 
import styles from "./Pagination.module.css";

function Pagination({
  totalNoOfPages,
  updatePageNmmber,
  nextPage,
  prevPage,
  currentPage,
}) {
  return (
    <>
      <div className={styles.pagination}>
        <LeftArrow prevPage={prevPage}/> 
        {totalNoOfPages.map((pageNumber) => (
          <button
            className= {` ${styles.paginationButton} ${currentPage === pageNumber ?  styles.paginationActive : "" }`}
            key={pageNumber}
            value={pageNumber}
            onClick={() => updatePageNmmber(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <RightArrow  nextPage={nextPage}/>
      </div>
    </>
  );
}

export default Pagination;
