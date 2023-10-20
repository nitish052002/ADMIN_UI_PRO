import styles from "./AddNewUserForm.module.css";
export default function AddNewUserForm({
  newUser,
  addNewUserHandler,
  inputChangeHandler,
  displayForm,
  isBlurActive,
}) {
  return (
    <div className={styles.formParent}>
      <form className={isBlurActive ? styles.activeForm : styles.deActiveForm}>
        <div className={styles.imageContainer}>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-rating-4118325-3414906.png" alt="newUserThumblain"/>
          <div className={styles.content}></div>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <div>
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter the name"
                onChange={inputChangeHandler}
                className={styles.inputField}
                value={newUser.name}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter the email"
                onChange={inputChangeHandler}
                className={styles.inputField}
                value={newUser.email}
                required
              />
            </div>
            <div>
              <label>Role</label>
              <input
                name="role"
                type="text"
                placeholder="Enter the role"
                onChange={inputChangeHandler}
                className={styles.inputField}
                value={newUser.role}
                required
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <input
              type="button"
              name="cancel"
              className={styles.cancel}
              value="Cancel"
              onClick={displayForm}
            />
            <input
              type="submit"
              name="save"
              className={styles.addUser}
              value="Add"
              onClick={addNewUserHandler}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
