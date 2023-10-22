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
  const { id, name, email, role, isChecked } = userData; //destructuring userData
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
    event.stopPropagation();
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

  const editHandler = (event) => {
    event.stopPropagation();
    let data = userList.find((user) => user.id === id);
    setEditableData(data);
  };

  //  function to cancel the edit or updating the user information
  const cancelHandler = (event) => {
    event.stopPropagation();
    setEditableData(null);
  };

  //  function to update the user information
  const onClickSaveIcon = (event) => {
    let isEmpty = false;
    event.stopPropagation();
    for (let key in updatedData) {
      if (updatedData[key].trim() === "") {
        isEmpty = true;
        alert(` Error One Of Field Is Empty :( `);
      }
    }

    if (!isEmpty) {
      updateHandler(id, updatedData);
      setEditableData(null);
    }
  };

  useEffect(() => {
    if (editableData) {
      setUpdatedData(editableData);
    }
  }, [editableData]);

  return (
    <tr
      key={id}
      onClick={(event) => {
        singleCHeched(id, userData);
      }}
      className={isChecked ? styles.selected : ""}
    >
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
            placeholder="Name"
            type="text"
            name="name"
            value={updatedData.name}
            className={styles.inputField}
            onChange={inputChangeHandler}
            onClick={(e) => {
              e.stopPropagation();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
            }}
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
