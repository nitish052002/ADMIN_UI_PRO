import styles from "../Icons.module.css"
function Save({ onClickSaveIcon }) {
    return (
      <>
        <button className= {styles.Icon} onClick={onClickSaveIcon}>
          <svg
            width="16"
            height="16"
            
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M3 7.5V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V16.5"
              stroke="currentColor"
              
              
            />{" "}
            <path
              d="M6 21V17"
              stroke="currentColor"
              
              
            />{" "}
            <path
              d="M18 21V13.6C18 13.2686 17.7314 13 17.4 13H15"
              stroke="currentColor"
              
              
            />{" "}
            <path
              d="M16 3V8.4C16 8.73137 15.7314 9 15.4 9H13.5"
              stroke="currentColor"
              
              
            />{" "}
            <path
              d="M8 3V6"
              stroke="currentColor"
              
              
            />{" "}
            <path
              d="M1 12H12M12 12L9 9M12 12L9 15"
              stroke="currentColor"
              
              
            />{" "}
          </svg>
         
        </button>
      </>
    );
  }


  export default Save