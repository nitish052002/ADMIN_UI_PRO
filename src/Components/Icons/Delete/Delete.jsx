import styles from "../Icons.module.css"
function Delete({ deleteHandler, id }) {
  return (
    <>
      <button
        onClick={(event) => {
          deleteHandler(id,event);
        }}
        className={styles.Icon}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          {" "}
          <g>
            {" "}
            <path fill="none" d="M0 0h24v24H0z" />{" "}
            <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" />{" "}
          </g>{" "}
        </svg>
      </button>
    </>
  );
}

export default Delete;
