import Row from "../Row/Row";
import "./Table.module.css";
function Table({
  deleteHandler,
  userData,
  editHandler,
  onSelectAll,
  updateHandler,
  inputChangeHandler,
  editableData,
  singleCHeched,
  checkedAll,
}) {
  return (
    <div className="user-container">
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="selectAll"
                  checked={checkedAll}
                  onChange={onSelectAll}                
                />
              </th>
              <th>
                <h3>Name</h3>
              </th>
              <th>
                <h3>Email</h3>
              </th>
              <th>
                <h3>Role</h3>
              </th>
              <th>
                <h3>Action</h3>
              </th>
            </tr>
          </thead>

          <tbody>
            {userData.map((data) => {
              if (data.id)
                return (
                  <Row
                    key={data.id}
                    userList={userData}
                    userData={data}
                    editableData={editableData}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}
                    updateHandler={updateHandler}
                    inputChangeHandler={inputChangeHandler}
                    singleCHeched={singleCHeched}
                  />
                );
            })}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
}
export default Table;
