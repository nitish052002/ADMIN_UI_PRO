import styles from "../../Pagination/Pagination.module.css"
function LeftArrow({prevPage}) {
  return (
    <button 
    onClick={prevPage}
    className= {styles.paginationButton}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-double-left"
        viewBox="0 0 16 16"
      >
        {" "}
        <path
          fillRule="evenodd"
          d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />{" "}
        <path
          fillRule="evenodd"
          d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />{" "}
      </svg>
    </button>
  );
}
export default LeftArrow;
