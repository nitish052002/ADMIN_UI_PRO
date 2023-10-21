import Cancel from "../Icons/Cancel/Cancel";
import Delete from "../Icons/Delete/Delete";
import Edit from "../Icons/Edit/Edit";
import Save from "../Icons/Save/Save";
import styles from "./Row.module.css";
import { useEffect, useState } from "react";

function Row({
  updateHandler,
  deleteHandler,
  userData,
  userList,
  singleCHeched,
}) {
  const { id, name, email, role, isChecked } = userData;
  const [editableData, setEditableData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id: id,
    name: "",
    email: "",
    role: "",
  });

  /*
   * function to update input field when user will click on edit button
   * @param{{target : {name : string , value : string}}} event
   */

  const inputChangeHandler = (event) => {
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.value,
    });
  };

  /*
   * function to change the user color as per the role
   * @param (string) role --  role of the user (Admin or )
   *
   */

  let color;
  const badgeColor = (role) => {
    if (role.toLowerCase() === "member") {
      color = "teal";
    } else if (role.toLowerCase() === "admin") {
      color = "hsla(0, 85%, 41%, 0.774)";
    } else {
      color = "#2569c3";
    }
  };
  badgeColor(role);

  const editHandler = () => {
    let data = userList.find((user) => user.id === id);
    setEditableData(data);
  };

  //  function to cancel the edit or updating the user information
  const cancelHandler = () => {
    setEditableData(null);
  };

  //  function to update the user information
  const onClickSaveIcon = (event) => {
    updateHandler(id, event, updatedData);
    setEditableData(null);
  };

  useEffect(() => {
    if (editableData) {
      setUpdatedData(editableData);
    }
  }, [editableData]);

  return (
    <tr key={id}>
      <td>
        <input
          type="checkbox"
          name={name}
          checked={isChecked ? true : false}
          onChange={(event) => {
            singleCHeched(id, userData);
          }}
        />
      </td>
      <td className={editableData ? null : styles.avatarContainer}>
        {editableData ? (
          <input
            placeholder="Eame"
            type="text"
            name="name"
            value={updatedData.name}
            className={styles.inputField}
            onChange={inputChangeHandler}
          />
        ) : (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt=""
            />
            <b>{name}</b>
          </>
        )}
      </td>
      <td className={styles.email}>
        {editableData ? (
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={updatedData.email}
            onChange={inputChangeHandler}
            className={styles.inputField}
            required
          />
        ) : (
          email
        )}
      </td>

      <td>
        {editableData ? (
          <input
            placeholder="Role"
            type="text"
            name="role"
            value={updatedData.role}
            className={styles.inputField}
            onChange={inputChangeHandler}
          />
        ) : (
          <span style={{ backgroundColor: color }} className={styles.badge}>
            {role.toLowerCase()}
          </span>
        )}

        {/*  */}
      </td>
      <td>
        <div className="controlButtons">
          {editableData ? (
            <>
              <Save onClickSaveIcon={onClickSaveIcon} />
              <Cancel cancelHandler={cancelHandler} />
            </>
          ) : (
            <>
              <Edit editHandler={editHandler} />
              <Delete id={id} deleteHandler={deleteHandler} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
export default Row;
