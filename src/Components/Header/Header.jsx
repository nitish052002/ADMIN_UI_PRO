import styles from "./Header.module.css";
function Header({ value,isDisable,searchHandler, deleteAllSelectedUsers }) {
  return (
    <header>
      <form className={styles.searchForm}>
        <input
          type="text"
          name="user-search"
          className={styles.userSearch}
          placeholder="Search By Name, Role, Email"
          value={value}
          onChange={searchHandler}
        />

        <button   
              
          type="button"
          className={styles.deleteAllUser}
          onClick={deleteAllSelectedUsers}
          value="Delete All"
        >
          Delete All
        </button>
      </form>
    </header>
  );
}

export default Header;
