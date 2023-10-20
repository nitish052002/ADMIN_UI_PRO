import styles from "./Header.module.css";
function Header({ value, displayForm, searchHandler, deleteAllSelectedUsers }) {
  return (
    <header>
      <div className={styles.headerContainer}>
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
          <button
            onClick={displayForm}
            type="submit"
            className={styles.addUser}
          >
            Add User
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
